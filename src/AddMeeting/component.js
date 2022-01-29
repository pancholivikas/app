import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import DropDown from "../common/DropDown/component";
import { FormContainer, ElementContainer, NextBtn, ErrorText } from "./styles";

const INPUT_FIELDS = {
  date: "date",
  startTime: "startTime",
  endTime: "endTime",
  buildingName: "buildingName",
};

const INITITAL_STATE = {
  [INPUT_FIELDS.date]: {
    touched: false,
    value: "",
    isError: false,
    error: null,
  },
  [INPUT_FIELDS.startTime]: {
    touched: false,
    value: "",
    isError: false,
    error: null,
  },
  [INPUT_FIELDS.endTime]: {
    touched: false,
    value: "",
    isError: false,
    error: null,
  },
  [INPUT_FIELDS.buildingName]: {
    touched: false,
    value: "",
    isError: false,
    error: null,
  },
};

const AddMeeting = () => {
  const params = useParams();
  const navigate = useNavigate();
  const buildingNames = (params.buildingsName || []).split(",");
  const [formData, setFormData] = useState(INITITAL_STATE);

  const handleInput = (ev) => {
    const { name = "", value = "" } = ev.target;
    if (name) {
      setFormData({
        ...formData,
        [name]: {
          touched: true,
          value,
          isError: false,
        },
      });
    }
  };

  const handleNext = () => {
    let goNext = true;
    Object.keys(formData).forEach((formField) => {
      const { value, touched, isError } = formData[formField];
      if (!touched) {
        goNext = false;
      } else if (touched && !isError && !value) {
        goNext = false;
        setFormData({
          ...formData,
          [formField]: {
            touched: true,
            value,
            isError: true,
            error: "Field is empty",
          },
        });
      } else if (touched && value && isError) {
        setFormData({
          ...formData,
          [formField]: {
            touched: true,
            value,
            isError: false,
            error: "",
          },
        });
      }
    });
    if (goNext) {
      const meetingDetails = {
        [INPUT_FIELDS.buildingName]: formData[INPUT_FIELDS.buildingName].value,
        [INPUT_FIELDS.startTime]: formData[INPUT_FIELDS.startTime].value,
        [INPUT_FIELDS.endTime]: formData[INPUT_FIELDS.endTime].value,
        [INPUT_FIELDS.date]: formData[INPUT_FIELDS.date].value,
      };
      navigate(`/saveMeeting/${JSON.stringify(meetingDetails)}`);
    }
  };

  const getMinDate = () => {
    const date = new Date();
    const [month, day, year] = [
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
      date.getDate(),
      date.getFullYear(),
    ];
    return `${year}-${month}-${day}`;
  };

  return (
    <FormContainer>
      <ElementContainer>
        <label htmlFor="date">Choose a date for your meeting:</label>

        <input
          id="date"
          type="date"
          name={INPUT_FIELDS.date}
          value={formData[INPUT_FIELDS.date].value}
          min={getMinDate()}
          onChange={handleInput}
        />
        {formData[INPUT_FIELDS.date].isError && (
          <ErrorText>{formData[INPUT_FIELDS.date].error}</ErrorText>
        )}
      </ElementContainer>
      <ElementContainer>
        <label htmlFor="start-time">Choose start time for your meeting:</label>

        <input
          id="start-time"
          type="time"
          name={INPUT_FIELDS.startTime}
          value={formData[INPUT_FIELDS.startTime].value}
          onChange={handleInput}
        />
        {formData[INPUT_FIELDS.startTime].isError && (
          <ErrorText>{formData[INPUT_FIELDS.startTime].error}</ErrorText>
        )}
      </ElementContainer>
      <ElementContainer>
        <label htmlFor="end-time">Choose end time for your meeting:</label>

        <input
          id="end-time"
          type="time"
          name={INPUT_FIELDS.endTime}
          value={formData[INPUT_FIELDS.endTime].value}
          onChange={handleInput}
        />
        {formData[INPUT_FIELDS.endTime].isError && (
          <ErrorText>{formData[INPUT_FIELDS.endTime].error}</ErrorText>
        )}
      </ElementContainer>
      <ElementContainer>
        <label>Select Building</label>
        <DropDown
          name={INPUT_FIELDS.buildingName}
          data={buildingNames}
          handleChange={handleInput}
        />
      </ElementContainer>
      <NextBtn onClick={handleNext}>Next</NextBtn>
    </FormContainer>
  );
};

export default AddMeeting;
