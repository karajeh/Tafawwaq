"use client";
import AdminContainer from "../../../components/admin-panel/ui/admin-container";
import Searchbar from "../../../components/admin-panel/ui/Searchbar";
import BlogCard from "../../../components/admin-panel/blog/BlogCard";
import Paginations from "../../../components/student/Paginations";
import { useBlogs } from "../../../../store/blogs";



export default function Home() {
   return (
    <div className="flex flex-col gap-5 w-full h-full mt-5">
      <SavedBlogs />
    </div>
  );
}

const SavedBlogs = () => {
  const { blogCardData } = useBlogs();
  return (
    <AdminContainer
      footer={<Paginations />}
      rightComponent={<Searchbar placeholder="Search drafts here..." />}
      title="Saved Drafts"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:p-8 p-5 lg:gap-8 gap-5 flex-1">
        {blogCardData.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>
    </AdminContainer>
  );
};



