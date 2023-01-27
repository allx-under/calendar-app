import { useForm } from "react-hook-form";
import Modal from "react-modal/lib/components/Modal";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";

import closeIcon from "../../imgs/close-icon.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const EventForm = ({ isOpenModal, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal
      isOpen={isOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <StyledForm onSubmit={handleSubmit((data) => console.log(data))}>
        <StyledCloseBtn onClick={closeModal}>
          <img src={closeIcon} width="25px" height="25px" alt="" srcset="" />
        </StyledCloseBtn>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{
            marginTop: "20px",
            marginBottom: "10px",
          }}
          {...register("title", { required: true })}
        />
        {errors.title && <p style={{ color: "red" }}>Title is required.</p>}
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          multiline
          defaultHeight="150px"
          minRows="4"
          maxRows="4"
          sx={{
            marginBottom: "10px",
          }}
          {...register("description")}
        />

        <Wrapper>
          <TextField
            id="outlined-basic"
            variant="outlined"
            type="date"
            sx={{
              marginBottom: "10px",
            }}
            {...register("date", { required: true })}
          />
          {errors.date && (
            <p style={{ color: "red" }}>
              Please enter date for your future event.
            </p>
          )}
          <TextField
            variant="outlined"
            type="time"
            sx={{
              marginBottom: "10px",
            }}
            {...register("time", {
              pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            })}
          />
        </Wrapper>

        <Button
          variant="outlined"
          color="info"
          sx={{ width: "100px", marginLeft: "auto" }}
          type="submit"
        >
          Save
        </Button>
      </StyledForm>
    </Modal>
  );
};

export default EventForm;

const StyledForm = styled.form`
  width: 500px;
  height: 350px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCloseBtn = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  position: absolute;
  cursor: pointer;
  top: -15px;
  right: -15px;
  transition: transform 250ms linear;
  &:hover {
    transform: rotateY(180deg);
  }
`;
