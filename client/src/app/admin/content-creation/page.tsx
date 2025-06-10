"use client";
import React, { useState, useCallback } from "react";
import AdminContainer from "../../components/admin-panel/ui/admin-container";
import { Button } from "../../components/admin-panel/ui/button";
import Searchbar from "../../components/admin-panel/ui/Searchbar";
import TabComponent from "../../components/admin-panel/ui/Tabs";
import BlogCard from "../../components/admin-panel/blog/BlogCard";
import CareerCard from "../../components/admin-panel/blog/CareerCard";
import Paginations from "../../components/student/Paginations";
import { useBlogs } from "../../../store/blogs";
import Link from "next/link";

// Define the type for form data
interface FormData {
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  deadline: string;
  location: string;
  employmentType: string;
}

// Define the type for career data
interface Career {
  id: number;
  title: string;
  category: string;
  tag: {
    name: string;
    color: string;
  };
  description: string;
  responsibilities: string;
  requirements: string;
  deadline: string;
  location: string;
  employmentType: string;
}

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    deadline: "",
    location: "remote",
    employmentType: "full-time",
  });

  const handleTabChange = useCallback((index: number) => {
    setTabIndex(index);
  }, []);

  const Tabs = [
    {
      title: "Blogs",
      component: Blogs,
    },
    {
      title: "Careers",
      component: Careers,
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const handleEditData = (career: Career) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setFormData({
      title: career.title || "",
      description: career.description || "",
      responsibilities: career.responsibilities || "",
      requirements: career.requirements || "",
      deadline: career.deadline || "",
      location: career.location || "remote",
      employmentType: career.employmentType || "full-time",
    });
  };

  return (
    <div className="flex flex-col gap-5 w-full h-full mt-5">
      <div className="flex md:flex-row flex-col items-center gap-5 w-full justify-between px-2">
        <TabComponent
          tabIndex={tabIndex}
          setTabIndex={handleTabChange}
          tabItems={Tabs}
        />
        {tabIndex === 0 ? (
          <Link href="/admin/content-creation/createblog">
            <Button
              color="button_primary"
              className="bg-primary cursor-pointer justify-center ml-auto w-fit"
            >
              Create Blog
            </Button>
          </Link>
        ) : (
          <Button
            color="button_primary"
            className="bg-primary cursor-pointer justify-center ml-auto w-fit"
            onClick={handleOpenModal}
          >
            Add Position
          </Button>
        )}
      </div>
      <div>
        {tabIndex === 0 && <Blogs />}
        {tabIndex === 1 && <Careers handleEditData={handleEditData} />}
      </div>

      {isModalOpen && (
        <div className="absolute top-0 left-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-scroll">
          <div className="bg-white p-5 rounded shadow-lg w-1/2">
            <h2 className="text-lg font-semibold mb-4">Add New Position</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-1"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full border rounded p-2"
                  placeholder="Enter job title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Job Description
                </label>
                <textarea
                  id="description"
                  className="w-full border rounded p-2"
                  placeholder="Enter job description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="responsibilities"
                  className="block text-sm font-medium mb-1"
                >
                  Roles and Responsibilities
                </label>
                <textarea
                  id="responsibilities"
                  className="w-full border rounded p-2"
                  placeholder="Enter roles and responsibilities (bullet points)"
                  value={formData.responsibilities}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="requirements"
                  className="block text-sm font-medium mb-1"
                >
                  Requirements
                </label>
                <textarea
                  id="requirements"
                  className="w-full border rounded p-2"
                  placeholder="Enter requirements (bullet points)"
                  value={formData.requirements}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium mb-1"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  className="w-full border rounded p-2"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-1"
                >
                  Job Location
                </label>
                <select
                  id="location"
                  className="w-full border rounded p-2"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="remote">Remote</option>
                  <option value="onsite">On-Site</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="employment-type"
                  className="block text-sm font-medium mb-1"
                >
                  Employment Type
                </label>
                <select
                  id="employmentType"
                  className="w-full border rounded p-2"
                  value={formData.employmentType}
                  onChange={handleChange}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  className="bg-gray-300 text-black"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                {isEditing && (
                  <Button
                    className="bg-gray-300 text-black"
                    onClick={handleCloseModal}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  color="button_primary"
                  className="bg-primary"
                  type="submit"
                >
                  {isEditing ? "Edit" : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const Blogs = () => {
  const { blogCardData } = useBlogs();
  return (
    <AdminContainer
      footer={<Paginations />}
      rightComponent={<Searchbar placeholder="Search blog here..." />}
      title="Blogs"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:p-8 p-5 lg:gap-8 gap-5 flex-1">
        {blogCardData.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </AdminContainer>
  );
};

const Careers = ({
  handleEditData,
}: {
  handleEditData: (career: Career) => void;
}) => {
  const handleEditCareer = (career: Career) => {
    handleEditData(career);
  };

  return (
    <AdminContainer
      footer={<Paginations />}
      rightComponent={<Searchbar placeholder="Search career here..." />}
      title="Careers"
    >
      <div className="grid grid-cols-1 lg:p-8 p-5 lg:gap-8 gap-5 flex-1">
        {careers.map((career, index) => (
          <CareerCard
            key={index}
            {...career}
            onEdit={(career: Career) => {
              handleEditCareer(career);
            }}
          />
        ))}
      </div>
    </AdminContainer>
  );
};

const careers: Career[] = [
  {
    id: 1,
    title: "Product Designer",
    category: "Design",
    tag: {
      name: "Software",
      color: "#ff0000",
    },
    description:
      "We're looking for a mid-level product designer to join our team.",
    responsibilities: "Do this",
    requirements: "Do this",
    deadline: "",
    location: "remote",
    employmentType: "full-time",
  },
  {
    id: 2,
    title: "Product Designer",
    category: "Design",
    tag: {
      name: "Software",
      color: "#175CD3",
    },
    description:
      "We're looking for a mid-level product designer to join our team.",
    responsibilities: "Do this",
    requirements: "Do this",
    deadline: "",
    location: "remote",
    employmentType: "part-time",
  },
];
