import BlogOverview from "@/components/blog-overview";

async function fetchListOfBlogs() {
  try {
    const response = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store",
    });

    const result = await response.json();
    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function Blogs() {
  const blogs = await fetchListOfBlogs();

  // console.log("blogs", blogs);
  return <BlogOverview blogs={blogs} />;
}

export default Blogs;
