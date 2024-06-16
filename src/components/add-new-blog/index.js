"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fragment } from "react";

export default function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  blogFromData,
  setBlogFormData,
  handleSaveBlogData,
  currentEditID,
  setCurrentEditID,
}) {
  return (
    <Fragment>
      <div>
        {/* ha rákattintunk a gombra akkor a dialog nyitva lesz */}
        <Button onClick={() => setOpenBlogDialog(true)}>Add New Post</Button>
      </div>
      {/* megnyitási triggernek beállítjuk a openBlogDialog-t  */}
      <Dialog
        open={openBlogDialog}
        onOpenChange={() => {
          setOpenBlogDialog(false);
          setBlogFormData({
            title: "",
            description: "",
          });
          setTimeout(() => {
            setCurrentEditID(null);
          }, 500);
          //mivel lehetne látni a szöveg váltást, ezért 500ms után nullázzuk csak a jelenlegi szerkesztendő blog ID-jét
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {currentEditID
                ? "Edit Your Blog Post"
                : "Add New Post To Your Blog"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={blogFromData.title}
                onChange={(e) =>
                  setBlogFormData({ ...blogFromData, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Enter description"
                value={blogFromData.description}
                onChange={(e) =>
                  setBlogFormData({
                    ...blogFromData,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlogData} type="button">
              {loading ? "Loading..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
