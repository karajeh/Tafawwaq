'use client'
import Image, { StaticImageData } from "next/image";
import React from "react";
import person1 from 'public/images/best-practice/person1.png'
import person2 from 'public/images/best-practice/person2.png'
import person3 from 'public/images/best-practice/person3.png'
import person4 from 'public/images/best-practice/person4.png'
import Button from "./Button";
import Link from "next/link";
interface TutorCardProps {
    limit: number;
}
const TutorCards: React.FC<TutorCardProps> = ({ limit }) => {
    if (limit === 4)
        return (
            <div className='w-full mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                <Card title="Finance is now easy!" image={person1} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Ashlynn Baptista" />
                <Card title="Finance is now easy!" image={person2} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Davis Ekstrom Bothman" />
                <Card title="Finance is now easy!" image={person3} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Ashlynn Baptista" />
                <Card title="Finance is now easy!" image={person4} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Davis Ekstrom Bothman" />
                <Card title="Finance is now easy!" image={person1} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Ashlynn Baptista" />
                <Card title="Finance is now easy!" image={person2} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Davis Ekstrom Bothman" />
                <Card title="Finance is now easy!" image={person3} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Ashlynn Baptista" />
                <Card title="Finance is now easy!" image={person4} content="Nunc scelerisque tincidunt elit. Vestibulum non mi ipsum. Craspretium suscipit tellus sit amet aliquet. Vestibulum maximus." author="Davis Ekstrom Bothman" />
            </div>


        );
}
interface CardProps {
    title: string;
    image: StaticImageData;
    content: string;
    author?: string;
}

const Card: React.FC<CardProps> = ({ title, image, content, author }) => {
    return (

        <div className="w-full bg-white border border-gray-200 rounded-lg p-4 ">
            <a href="#">
                <Image className="rounded-lg shadow" src={image} alt="" />
            </a>
            <div className="pt-3">
                <Link href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">{title}</h5>
                </Link>
                <p className="mb-1 text-sm text-gray-700">{content}</p>
                <p className="mb-2 text-md text-primary">{author}</p>
                <div className="w-24 h-10">
                    <Button small label="Read more" classNames="rounded-3xl" outline />
                </div>
            </div>
        </div>
    )
}

export default TutorCards