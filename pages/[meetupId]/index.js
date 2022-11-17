import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupDetails(props) {
  const { image, title, address, description } = props.meetupData;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        title={title}
        image={image}
        address={address}
        description={description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect("mongodb://localhost:27017/");
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect("mongodb://localhost:27017/");
  const db = client.db("meetups");
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
