import React from 'react'
import ReactQuill, { Quill } from "react-quill";

import ImageUploader from "quill-image-uploader";

Quill.register("modules/imageUploader", ImageUploader);

const Editor = (props) => {
  const Image = Quill.import('formats/image');
  Image.className = 'quill-image';
  Quill.register(Image, true);  
  const modules = {
    toolbar: [
      ["bold", "italic", "image"],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }]
    ],
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("files", file);
          fetch(
            "http://localhost:4000/",
            {
              method: "POST",
              body: formData
            }
          )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
              resolve("http://localhost:4000/uploads/" + result.imageLink);
            })
            .catch((error) => {
              reject("Upload failed");
              console.error("Error:", error);
            });
        });
      }
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot"
  ];


  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={props.editorHtml}
      onChange={props.onChange}
    />
  );
};

export default Editor
