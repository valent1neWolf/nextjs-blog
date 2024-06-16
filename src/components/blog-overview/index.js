"use client";

import AddNewBlog from "../add-new-blog";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { set } from "mongoose";
//kiraktuk ide mar, hogy így szebb
const initialBlogFromData = {
  title: "",
  description: "",
};

export default function BlogOverview({ blogs }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false); //beállítunk egy state-et, hogy a dialog nyitva van-e vagy sem
  const [loading, setLoading] = useState(false); //magát a loadingot nem mi irányítjuk, mi csak annyit csinálunk, hogy amikor adatgyűjtés és tárolás van folyamatban akkor ezt a loadingot bekapcsoljuk és megjelenítünk valami HTML elemet, ami jelzi a felhasználónak, hogy dolgozunk az adatokon
  const [blogFromData, setBlogFormData] = useState(initialBlogFromData); //beállítjuk a blog form adatait (title, description)
  const [currentEditID, setCurrentEditID] = useState(null); //beállítjuk a jelenlegi szerkesztendő blog ID-jét
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);

  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const response =
        currentEditID !== null
          ? await fetch(`/api/update-blog?id=${currentEditID}`, {
              method: "PUT",
              body: JSON.stringify(blogFromData),
            })
          : await fetch("/api/add-blog", {
              method: "POST",
              body: JSON.stringify(blogFromData),
            });
      const data = await response.json();
      if (data?.success) {
        setBlogFormData(initialBlogFromData); //ha sikeres volt a mentés akkor törölje ki a form adatait
        setOpenBlogDialog(false); //ha sikeres volt a mentés akkor zárja be a dialogot
        setLoading(false); //ha sikeres volt a mentés akkor fejezze be a loadingot (ami ez esetben csak egy más HTML elemet eredményez)
        setCurrentEditID(null); //ha sikeres volt a mentés akkor törölje ki a jelenlegi szerkesztendő blog ID-jét
        router.refresh(); //frissítse az oldalt, hogy a legfrissebb adatokat jelenítse meg
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFromData);
    }
  }

  async function handleDeleteByID(getCurrentID) {
    try {
      //muszály beírni az ID-t, mert a backend ez alapján fogja tudni, hogy melyik blogot kell törölni
      const response = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(blog) {
    setCurrentEditID(blog?._id);
    setBlogFormData({
      title: blog?.title,
      description: blog?.description,
    });
    setOpenBlogDialog(true);
  }
  // console.log(currentEditID);
  // console.log(blogFromData);

  return (
    <main className="flex min-h-screen flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        blogFromData={blogFromData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
        currentEditID={currentEditID}
        setCurrentEditID={setCurrentEditID}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card className="p-5" key={blog._id}>
              <CardContent>
                <CardTitle className="mb-5">{blog.title}</CardTitle>
                <CardDescription>{blog.description}</CardDescription>
                <div className="mt-5 flex gap-5 items-center">
                  <Button onClick={() => handleEdit(blog)}>Edit</Button>
                  <Button onClick={() => handleDeleteByID(blog._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-white  text-2xl font-semibold">
            No blogs found. Add a new blog to get started.
          </div>
        )}
      </div>
    </main>
  );
}
