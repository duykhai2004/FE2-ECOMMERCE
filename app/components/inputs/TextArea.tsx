"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

interface TextAreaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  const [editorData, setEditorData] = useState("");

  return (
    <div className="w-full relative">
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        disabled={disabled}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          register(id).onChange({
            target: { name: id, value: data },
          });
        }}
        config={{
          placeholder: label,
        }}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          cursor-text
          text-md
          duration-150
          transform
          -translate-y-3
          top-5
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-slate-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
