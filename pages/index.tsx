"use client";

import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";


export default function Home() {
  const [studyTime, setStudyTime] = useState("");
  const [freeTime, setFreeTime] = useState("")
  const [travelTime, setTravelTime] = useState("")
  const [health, setHealth] = useState("")
  const [walc, setWalc] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [grade, setGrade] = useState("")


  const studyTimeCategories = ["Less than 2 hours", "2 to 5 hours", "5 to 10 hours", "More than 10 hours"];
  const freeTimeCategories = ["Less than 1 hour", "From 1 to 3 hours", "From 3 to 5 hours", "From 5 to 7 hours", "More than 7 hours"];
  const travelTimeCategories = ["Less than 15 minutes", "From 15 to 30 minutes", "From 30 minutes to 1 hour", "More than 1 hour"];
  const healthCategories = ["Under tight medical monitoring", "Under a one week doctor visit mandate", "Under a self-monitored medication", "Healthy but unfit", "Healthy and fit"];
  const weekendAlcoholCategories = ["No alcohol", "1 to 3 shots", "3 to 5 shots", "5 to 8 shots", "More than 8 shots"];


  function submitData(e: any) {
    e.preventDefault()
    setShowModal(true)
    axios.post("https://grade-predictor-api.azurewebsites.net/regress", { studyTime, freeTime, travelTime, health, walc })
      .then((res) => {
        setGrade(res.data['grade']);
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

      <h5 className="text-xl mt-[8vh] text-center font-bold text-black">
        <span className="underline">Predict</span> your grade
      </h5>
      <div className="mx-auto mt-[2vh] w-full max-w-md rounded-lg border border-gray-200 bg-white bg-gradient-to-r from-cyan-500 to-blue-500 p-4 shadow-md sm:p-6 md:p-8 mb-36 ">
        <form
          className="space-y-6"
        >

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
            onClick={(e) => submitData(e)}
            data-modal-target="small-modal" data-modal-toggle="small-modal"
            className="w-full from-cyan-500 to-blue-500 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 rounded-lg bg-gradient-to-r  px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        {showModal ? <Modal setGrade={setGrade} grade={grade} setShowModal={setShowModal} showModal={showModal} /> : null}
      </div >
    </>
  );
}

function Modal(props: { setShowModal: Function, grade: string, setGrade: Function, showModal: boolean }) {
  const { setShowModal, grade, setGrade, showModal } = props;
  return (
    <div id="small-modal" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
      <div className="relative w-full h-full max-w-md md:h-auto mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Prediction Result
            </h3>
            <button type="button" onClick={(e) => setShowModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="small-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex dark:text-white justify-center py-11">
            {
              grade === "" ?
                <ClipLoader size={50} loading={showModal} /> :
                <div className="text-center">
                  <p>Your predicted grade is: </p>
                  <h1 className="text-6xl">{Math.floor(parseInt(grade) / 20 * 100)} %</h1>
                </div>
            }
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <a href="https://wa.me/601136009570" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Consult with experts</a>
          </div>
        </div>
      </div>
    </div >
  )
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
                  name={`${title}-radio`}
                  checked={state === (index + 1).toString()}
                  onChange={() => { setStateFunc((index + 1).toString()) }}
                  className="h-4 w-4 bg-gray-100 text-blue-600  focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  required
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
