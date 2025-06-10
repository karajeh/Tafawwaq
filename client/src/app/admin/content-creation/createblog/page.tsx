"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import type { ReactQuillProps } from "react-quill";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: ImageResize } = await import(
      "quill-image-resize-module-react"
    );

    if (typeof window !== "undefined") {
      const { Quill } = RQ;
      Quill.register("modules/imageResize", ImageResize);
    }

    // Define named component with displayName
    const QuillComponent = (props: ReactQuillProps) => <RQ {...props} />;
    QuillComponent.displayName = "QuillComponent";

    return QuillComponent;
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />
    ),
  }
);

const Page = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>(title);
  const [metaDescription, setMetaDescription] = useState<string>("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  // Updated modules configuration without direct Quill reference
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };
  const router = useRouter();
  const categories = [
    // Academic Subjects
    "IGCSE",
    "IB (International Baccalaureate)",
    "SAT/ACT Prep",
    "Math Tutoring",
    "Science Tutoring",
    "Language Learning",
    "History and Social Studies",
    "Exam Preparation",
    "Homework Help",

    // Study Tips and Strategies
    "Time Management",
    "Effective Note-Taking",
    "Study Techniques",
    "Motivation and Productivity",
    "Overcoming Procrastination",
    "Memory Improvement",
    "Test-Taking Strategies",

    // Parenting and Education
    "How to Support Your Child’s Education",
    "Choosing the Right Tutor",
    "Balancing School and Extracurriculars",
    "Helping Your Child with Homework",
    "Preparing for Parent-Teacher Conferences",
    "Online Learning Tips for Parents",

    // Tutoring and Teaching
    "Becoming a Better Tutor",
    "Teaching Strategies",
    "Engaging Students Online",
    "Tutoring Tools and Resources",
    "Building a Tutor Profile",
    "Freelance Tutoring Tips",

    // Platform Features and Updates
    "How to Use Tafawwaq",
    "New Features and Updates",
    "Tips for Tutors on Tafawwaq",
    "Tips for Students on Tafawwaq",
    "Success Stories from Tafawwaq Users",

    // Career and Future Planning
    "College Application Tips",
    "Choosing the Right Career Path",
    "Scholarship and Financial Aid Advice",
    "Resume and Interview Tips",
    "Building Soft Skills",

    // Mental Health and Well-Being
    "Managing Exam Stress",
    "Building Confidence in Students",
    "Work-Life Balance for Students",
    "Mindfulness and Relaxation Techniques",
    "Dealing with Academic Pressure",

    // Technology and Tools
    "Best Apps for Students",
    "Online Learning Tools",
    "Using Technology in Education",
    "Virtual Classroom Tips",

    // Language and Communication
    "Improving Writing Skills",
    "Public Speaking Tips",
    "Learning a New Language",
    "Effective Communication for Students",

    // General Education Topics
    "The Importance of Education",
    "Trends in Education",
    "Global Education Systems",
    "Homeschooling Tips",

    // Tafawwaq Community
    "Tutor Spotlights",
    "Student Success Stories",
    "Community Events and Webinars",
    "Feedback and Suggestions",

    // Seasonal and Thematic Topics
    "Back-to-School Tips",
    "Holiday Study Plans",
    "New Year’s Resolutions for Students",
    "Summer Learning Programs",
  ];

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleAddTag = () => {
    if (tags.trim()) {
      setTagList([...tagList, tags.trim()]);
      setTags("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  };

  useEffect(() => {
    setSlug(generateSlug(title));
  }, [title]);

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(generateSlug(event.target.value));
  };

  const handleMetaDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMetaDescription(event.target.value);
  };

  const handlePublish = () => {
    // Implement publish functionality
    console.log("Blog published:", { title, content, tags, categories });
  };

  const handleSaveDraft = () => {
    // Implement save draft functionality
    console.log("Draft saved:", { title, content, tags, categories });
    console.log(featuredImage);
    router.push("/admin/content-creation/savedDrafts");
  };

  const handleSchedule = () => {
    setIsModalOpen(true);
  };

  const handleConfirmSchedule = () => {
    // Implement logic to save the scheduled date
    console.log("Post scheduled for:", scheduledDate);
    setIsModalOpen(false);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScheduledDate(event.target.value);
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleFeaturedImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (typeof window !== "undefined") {
      const file = event.target.files?.[0];
      if (file) {
        setFeaturedImage(file);
        setFeaturedImageUrl(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-[3]">
        <h1 className="mb-2 text-xl font-bold">Blog Title</h1>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter blog title"
          className="w-full mb-5 p-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h1 className="mb-2 text-xl font-bold">Slug</h1>
        <input
          type="text"
          value={slug}
          onChange={handleSlugChange}
          placeholder="Slug"
          className="w-full mb-5 p-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <h1 className="mb-2 text-xl font-bold">Meta Description</h1>
        <textarea
          value={metaDescription}
          onChange={handleMetaDescriptionChange}
          placeholder="Write a concise summary"
          className="w-full mb-5 p-4 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <h1 className="text-xl font-bold">Featured Image</h1>
        <p className="text-gray mb-2">
          Recommended size: 1200x630 pixels (JPEG or PNG, max 2MB)
        </p>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFeaturedImageChange}
          className="mb-5"
        />
        {featuredImageUrl && (
          <div>
            <Image
              src={featuredImageUrl}
              alt="Featured"
              layout="responsive"
              width={1200}
              height={630}
              className="mb-5 max-w-full h-auto"
            />
          </div>
        )}
        <div>
          <ReactQuill
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            formats={[
              "header",
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "list",
              "bullet",
              "indent",
              "link",
              "image",
              "video",
            ]}
            placeholder="Start writing your blog..."
            className="h-[400px]"
          />
          <style jsx>{`
            .ql-editor img {
              max-width: 100%;
              height: auto;
              display: block;
              margin: 0 auto;
            }
          `}</style>
        </div>
      </div>
      <div className="flex-1 bg-stone-200 rounded-xl mt-7">
        <div className="rounded-xl p-6 pb-0">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b-2 pb-3">
            Categories
          </h2>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full p-2 mb-4 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 border-y-2 py-1">
            Tags
          </h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tags}
              onChange={handleTagsChange}
              placeholder="Add tags"
              className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTag}
              className="bg-blue-400 text-white px-4 rounded-lg text-sm hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tagList.map((tag, index) => (
              <span
                key={index}
                className="flex items-center bg-gray-200 text-gray-700 text-sm rounded-lg px-2 py-1"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-6">
          <button
            onClick={handleSchedule}
            className="w-full mb-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 text-sm"
          >
            Schedule blog post
          </button>
          <div className="flex gap-3 mb-3">
            <button
              onClick={handleSaveDraft}
              className="flex-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 text-sm"
            >
              Save Draft
            </button>
            <button
              onClick={handlePreview}
              className="flex-1 py-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 text-sm"
            >
              Preview
            </button>
          </div>
          <button
            onClick={handlePublish}
            className="w-full py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Publish
          </button>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Schedule Post</h2>
              <input
                type="datetime-local"
                value={scheduledDate}
                onChange={handleDateChange}
                className="w-full p-2 mb-4 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmSchedule}
                  className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {isPreviewOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 relative rounded-lg w-full max-w-2xl">
              <div
                className="absolute top-2 right-2 text-gray font-semibold cursor-pointer"
                onClick={() => setIsPreviewOpen(false)}
              >
                X
              </div>
              <h1 className="text-2xl font-bold mb-4">{title}</h1>
              {featuredImageUrl && (
                <Image
                  src={featuredImageUrl}
                  alt="Featured"
                  layout="responsive"
                  width={1200}
                  height={630}
                  className="w-full h-auto mb-4 rounded-lg"
                />
              )}
              <div
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              {tagList.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tagList.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 text-sm rounded-lg px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
