"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../button/button";
import Input from "../input/input";
import { ChangeEvent, useState } from "react";
import Textarea from "../textarea/textarea";
import { Card } from "../card/card";
import H3 from "../headers/h3/h3";

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
    await fetch(`/api/reports`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    setUsers([]);
    reset();
  };

  const searchUsers = async (event: ChangeEvent<HTMLInputElement>) => {
    const response = await fetch(
      `/api/reported-users?search=${encodeURIComponent(event.target.value)}`
    );
    const data = await response.json();
    const { reportedUsers } = data;
    setUsers(reportedUsers);
    if (event.target.value === "") {
      setUsers([]);
    }
  };

  const onSelectUser = (username: string) => {
    setValue("username", username);
    setUsers([]);
  };

  return (
    <Card>
      <H3>Report a smurf</H3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 relative w-full"
      >
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
            <div className="bg-white/5 absolute z-30 top-11 w-full flex flex-col rounded-b-xl border border-gray-400 text-lg">
              {users.map((user) => (
                <span
                  key={user._id}
                  className="py-1 px-4 bg-[#364775] hover:brightness-90 last:rounded-b-xl"
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
        <Textarea
          id="textarea"
          placeholder="Message (optional)"
          {...register("message", {
            required: true,
          })}
          error={errors.message}
        />
        <Button type="submit">Report</Button>
      </form>{" "}
    </Card>
  );
};

export default Form;
