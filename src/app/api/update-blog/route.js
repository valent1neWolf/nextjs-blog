import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

//Joi segítségével ellenőrizzük, hogy a requestben megkapott adatok megfelelőek-e
const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    //ha nem találjuk meg az ID-t akkor invalid request
    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const { title, description } = await req.json();
    //lecsekkolja, hogy valóban azt kapta-e meg amit várt
    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message, //pl. ha számot adok meg a string helyett akkor azt jelzi
      });
    }

    //1. param: id
    //2. param: mit akarunk updatelni
    //3. param: változtatni akarunk a jelenlegin (ha nincs akkor nem változik)
    const updateCurrentBlogByID = await Blog.findOneAndUpdate(
      { _id: getCurrentBlogID },
      { title, description },
      { new: true }
    );

    if (updateCurrentBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong!",
    });
  }
}
