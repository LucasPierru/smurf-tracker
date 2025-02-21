"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../button/button";
import Input from "../input/input";
import { ChangeEvent, useState } from "react";
import Textarea from "../textarea/textarea";

const Form = () => {
  const [users, setUsers] = useState<{ _id: string; username: string }[]>([]);

  const schema = yup
    .object({
      username: yup
        .string()
        .matches(/#/, "Text must contain a #")
        .required("Username is required"),
      message: yup.string(),
    })
    .required();
  type Inputs = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log({ data });
    reset();
  };

  const searchUsers = async (event: ChangeEvent<HTMLInputElement>) => {
    const response = await fetch(
      `/api/reported-users?search=${encodeURIComponent(event.target.value)}`
    );
    const data = await response.json();
    const { userReported } = data;
    setUsers(userReported);
    console.log({ userReported });
    if (event.target.value === "") {
      setUsers([]);
    }
  };

  const onSelectUser = (username: string) => {
    setValue("username", username);
    setUsers([]);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 relative w-full"
    >
      <div className="flex gap-2">
        <div className="relative w-full">
          <Input
            id="username"
            type="text"
            placeholder="Username, ie. user#1234"
            {...register("username", {
              required: true,
            })}
            onChange={searchUsers}
            error={errors.username}
          />
          {users.length > 0 && (
            <div className="bg-white absolute z-30 top-11 w-full flex flex-col rounded-b-xl border border-gray-400 text-lg">
              {users.map((user) => (
                <span
                  key={user._id}
                  className="py-1 px-4 bg-white hover:brightness-90 last:rounded-b-xl"
                  onClick={() => {
                    onSelectUser(user.username);
                  }}
                >
                  {user.username}
                </span>
              ))}
            </div>
          )}
        </div>
        <Button type="submit">Report</Button>
      </div>
      <Textarea
        id="textarea"
        placeholder="Message (optional)"
        {...register("message", {
          required: true,
        })}
        error={errors.message}
      />
    </form>
  );
};

export default Form;
