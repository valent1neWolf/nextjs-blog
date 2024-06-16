import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

//Joi segítségével ellenőrizzük, hogy a requestben megkapott adatok megfelelőek-e
const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

//Post request létrehozása, mellyel új blogot tudunk hozzáadni
export async function POST(req) {
  try {
    await connectToDB(); //csatlakozunk az adatbázishoz

    const extractBlogData = await req.json(); //ezzel kinyerjük a requestből az adatokat
    const { title, description } = extractBlogData; //kinyerjük a title és description adatokat

    //lecsekkolja, hogy valóban azt kapta-e meg amit várt
    const { error } = AddNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message, //pl. ha számot adok meg a string helyett akkor azt jelzi
      });
    }

    const newlyCreatedBlogItem = await Blog.create(extractBlogData); //létrehozzuk az új blogot
    if (newlyCreatedBlogItem) {
      //ha sikerült létrehozni
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      //ha nem sikerült létrehozni
      return NextResponse.json({
        success: false,
        message: "Error while adding blog. Please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error while adding blog. Please try again later.",
    });
  }
}
