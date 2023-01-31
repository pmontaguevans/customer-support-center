import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import api from "../axios";
import "../App.css";
import "./Support.css";

export async function action({ request }: any) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await api.post("/customer", updates);
  return redirect(`/support`);
}

// export async function loader() {
//   try {
//     const { data } = await api.get("/customer");
//     return { tickets: data.tickets };
//   } catch (err: any) {
//     throw new Error(err);
//   }
// }

const Support = () => {
  const navigate = useNavigate();

  return (
    <Form method="post" id="customer-form">
      <h1 className="">Support ticket</h1>
      <div className="form__row">
        <div>
          <p>
            <label>
              <span>Your name</span>
              <input
                className="input"
                placeholder="Your name"
                aria-label="customerName"
                type="text"
                name="customerName"
              />
            </label>
          </p>
          <p>
            <label>
              <span>Your email</span>
              <input
                className="input"
                placeholder="Your email"
                aria-label="email"
                type="text"
                name="email"
              />
            </label>
          </p>
          <p>
            <label>
              <span>Title</span>
              <input
                className="input"
                placeholder="Title"
                aria-label="title"
                type="text"
                name="title"
              />
            </label>
          </p>
          <p>
            <label>
              <span>Product No</span>
              <input
                className="input"
                placeholder="Product Number"
                aria-label="Product Number"
                type="text"
                name="productNo"
              />
            </label>
          </p>
          <p>
            <label>
              <span>Description</span>
              <textarea
                className="input"
                placeholder="Description"
                aria-label="Desription"
                name="description"
                rows={6}
              />
            </label>
          </p>
          <div>
            <p className="action__buttons">
              <button type="submit">Post ticket</button>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Support;
