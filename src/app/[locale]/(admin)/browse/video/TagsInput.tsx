import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface TagsInputProps {
  control: Control<any>;
  name: string;
  listSpeakers?: any;
}

const TagsInput: React.FC<TagsInputProps> = ({
  control,
  name,
  listSpeakers,
}) => {
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<any>();

  const addTag = (tag: any) => {
    if (tag) {
      const newSpeaker: any = {
        id: 0,
        fullName: tag,
        email: "",
        title: "",
      };
      const newTags = [...tags, newSpeaker];
      setTags(newTags);
      setTagInput("");
      return newTags;
    }
    return tags;
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter(
      (_: any, index: any) => index !== indexToRemove
    );
    setTags(newTags);
    return newTags;
  };
  useEffect(() => {
    setTags(listSpeakers);
  }, [listSpeakers]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags &&
              tags.length > 0 &&
              tags.map((tag: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center bg-[#ebf5ff] text-[#175cd3] px-3 py-1 rounded-full"
                >
                  {tag.fullName}
                  <button
                    type="button"
                    className="ml-2 text-[#175cd3] hover:text-[#175cd3]"
                    onClick={() => field.onChange(removeTag(index))}
                  >
                    &times;
                  </button>
                </div>
              ))}
          </div>
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                field.onChange(addTag(tagInput));
              }
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </>
      )}
    />
  );
};

export default TagsInput;
