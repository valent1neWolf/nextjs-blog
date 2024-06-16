import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB(); //csatlakozunk az adatbázishoz

    const allBlogs = await Blog.find({}); //megkeressük az összes blogot

    if (allBlogs) {
      return NextResponse.json({
        success: true,
        message: "All blogs fetched successfully",
        data: allBlogs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Error while fetching blogs. Please try again later.",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Error while fetching blogs. Please try again later.",
    });
  }
}
