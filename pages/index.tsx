"use client";

import Head from "next/head";
import { Inter } from "@next/font/google";
import { FormEvent, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [studyTime, setStudyTime] = useState("");
  const [freeTime, setFreeTime] = useState("")
  const [travelTime, setTravelTime] = useState("")
  const [health, setHealth] = useState("")
  const [walc, setWalc] = useState("")


  const studyTimeCategories = ["Less than 2 hours", "2 to 5 hours", "5 to 10 hours", "More than 10 hours"];
  const freeTimeCategories = ["Less than 1 hour", "From 1 to 3 hours", "From 3 to 5 hours", "From 5 to 7 hours", "More than 7 hours"];
  const travelTimeCategories = ["Less than 15 minutes", "From 15 to 30 minutes", "From 30 minutes to 1 hour", "More than 1 hour"];
  const healthCategories = ["Under tight medical monitoring", "Under a one week doctor visit mandate", "Under a self-monitored medication", "Healthy but unfit", "Healthy and fit"];
  const weekendAlcoholCategories = ["No alcohol", "1 to 3 shots", "3 to 5 shots", "5 to 8 shots", "More than 8 shots"];


  function submitData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    axios.post("http://127.0.0.1:8000/regress", { studyTime, freeTime, travelTime, health, walc })
      .then((res) => {
        console.log("The response is ", res);
      })
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="m-auto mt-[10vh] w-full max-w-md rounded-lg border border-gray-200 bg-white bg-gradient-to-r from-cyan-500 to-blue-500 p-4 shadow-md sm:p-6 md:p-8 mb-36 ">
        <form
          className="space-y-6"
          onSubmit={(e) => submitData(e)}
        >
          <h5 className="text-xl text-center font-bold underline text-white">
            Predict your grade
          </h5>

          <RadioList
            categories={studyTimeCategories}
            title="studytime"
            state={studyTime}
            setStateFunc={setStudyTime}
            desc="How many hours do you independently study each week? (Exclude class time)"
          />

          <RadioList
            categories={freeTimeCategories}
            title="freetime"
            state={freeTime}
            setStateFunc={setFreeTime}
            desc="How many free time do you have after school? Count assignments as free time, consider chores, part time jobs, or private classes"
          />

          <RadioList
            categories={travelTimeCategories}
            title="traveltime"
            state={travelTime}
            setStateFunc={setTravelTime}
            desc="How long is the travel time from home to school?"
          />

          <RadioList
            categories={healthCategories}
            title="health"
            state={health}
            setStateFunc={setHealth}
            desc="How healthy is your body?"
          />

          <RadioList
            categories={weekendAlcoholCategories}
            title="walc"
            state={walc}
            setStateFunc={setWalc}
            desc="How much alcohol do you consume weekly?"
          />
          <button
            type="submit"
            className="w-full hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div >
    </>
  );
}



function RadioList(props: { categories: Array<string>, title: string, state: string, setStateFunc: Function, desc: string }): JSX.Element {
  const { categories, title, state, setStateFunc, desc } = props;
  return (
    <>
      <div>
        <label
          className="mb-2 block text-lg font-medium text-gray-900 dark:text-white"
        >
          {desc}
        </label>
        <fieldset>
          {categories.map((category, index) => {
            return (
              <div className="mb-2 flex items-center" key={index}>
                <input
                  id={title + "-" + (index + 1).toString()}
                  type="radio"
                  value={title + "-" + (index + 1).toString()}
                  name={`${title}-radio-` + (index + 1).toString()}
                  checked={state === (index + 1).toString()}
                  onChange={() => { setStateFunc((index + 1).toString()) }}
                  className="h-4 w-4 bg-gray-100 text-blue-600  focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor={title + "-radio" + (index + 1).toString()}
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  {category}
                </label>
              </div>
            )
          })}
        </fieldset>
      </div>
    </>)
}
