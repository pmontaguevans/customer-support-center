import React, { useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import api, { Ticket } from "../axios";
import "./Support.css";

type FormData = {
  [k: string]: any;
  title: string;
  description: string;
  customerName: string;
  email: string;
  productNo: string;
  agentId: string | null;
};

export async function action({ request }: any) {
  const formData = await request.formData();
  const updates: FormData = Object.fromEntries(formData) as FormData;
  await api.tickets.create(updates);

  return redirect("/");
}

const Support = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<Ticket>({
    customerName: "",
    email: "",
    productNo: "",
    title: "",
    description: "",
    agentId: null,
  });

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFormValues({
      ...formValues,
      [e.target.name]: value,
    });
  };

  return (
    <Form method="post" id="customer-form">
      <h1 onClick={() => navigate("/")}>Support ticket</h1>
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
                value={formValues.customerName}
                onChange={handleChange}
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
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
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
                value={formValues.title}
                onChange={handleChange}
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
                value={formValues.productNo}
                onChange={handleChange}
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
                value={formValues.description}
                onChange={handleChange}
              />
            </label>
          </p>
          <div>
            <p className="action__buttons">
              <button
                disabled={
                  !formValues.customerName ||
                  !formValues.description ||
                  !formValues.title ||
                  !formValues.productNo ||
                  !formValues.email
                }
                type="submit"
              >
                Post ticket
              </button>
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Support;
