import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Modal from "react-modal/lib/components/Modal";
import styled from "styled-components";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import closeIcon from "../../imgs/close-icon.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#e8f0ce ",
  },
};
const EventForm = ({
  isOpenModal,
  closeModal,
  setEvents,
  openToUpdate,
  setOpenToUpdate,
  updatedData,
  setDataToUpdate,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmitSaveEvent = (data) => {
    const dataToSave = { ...data, createdAt: Date.now(), updatedAt: null };
    setEvents((events) => [...events, dataToSave]);
    reset();
    closeModal();
  };

  const onSubmitUpdateEvent = (data) => {
    const dataToUpdate = {
      ...data,
      createdAt: updatedData.createdAt,
      updatedAt: Date.now(),
    };
    setEvents((events) => {
      const filteredEvents = events.filter(
        (e) => e.createdAt !== updatedData.createdAt
      );
      return [...filteredEvents, dataToUpdate];
    });
    setOpenToUpdate(false);
    reset();
    closeModal();
  };

  const onClickRemoveEvent = () => {
    setEvents((events) =>
      events.filter((e) => e.createdAt !== updatedData.createdAt)
    );
    onCloseUpdatedForm();
  };

  const setValuesToEditForm = () => {
    Object.keys(updatedData).map((_, index) =>
      setValue(
        Object.keys(updatedData)[index],
        Object.values(updatedData)[index]
      )
    );
  };

  const isOpenEditFormSetValues = () => {
    if (updatedData) {
      setValuesToEditForm();
    }
  };

  const onCloseUpdatedForm = () => {
    if (openToUpdate) {
      setOpenToUpdate(false);
      setDataToUpdate({});
      reset();
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onAfterOpen={isOpenEditFormSetValues}
      onRequestClose={onCloseUpdatedForm}
      style={customStyles}
      ariaHideApp={false}
    >
      <StyledForm
        onSubmit={handleSubmit(
          openToUpdate ? onSubmitUpdateEvent : onSubmitSaveEvent
        )}
      >
        <StyledCloseBtn type="button" onClick={onCloseUpdatedForm}>
          <img src={closeIcon} width="25px" height="25px" alt="close-icon" />
        </StyledCloseBtn>
        {!openToUpdate ? <h3>ADD NEW EVENT</h3> : <h3>EDIT EVENT</h3>}
        <StyledTimeStamp>
          <span>
            {updatedData.createdAt &&
              `Created at: ${new Date(updatedData.createdAt).toLocaleString()}`}
          </span>
          <span>
            {updatedData.updatedAt &&
              `Updated at: ${new Date(updatedData.updatedAt).toLocaleString()}`}
          </span>
        </StyledTimeStamp>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          sx={{
            marginTop: "20px",
            marginBottom: "10px",
          }}
          {...register("title", {
            required: true,
          })}
        />
        {errors.title && (
          <p style={{ color: "red", margin: "0", marginBottom: "2px" }}>
            Title is required.
          </p>
        )}
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          multiline
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
            <p style={{ color: "red", margin: "0", marginLeft: "3px" }}>
              Please enter date for your future event.
            </p>
          )}
          <TextField
            variant="outlined"
            type="time"
            sx={{
              marginBottom: "10px",
              width: "105px",
            }}
            {...register("time", {
              pattern: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            })}
          />
        </Wrapper>
        <Wrapper>
          {openToUpdate && (
            <IconButton
              color="warning"
              sx={{ width: "40px", marginLeft: "350px" }}
              type="button"
              onClick={onClickRemoveEvent}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Button
            variant="outlined"
            color="info"
            sx={{ width: "105px", marginLeft: "auto" }}
            type="submit"
          >
            Save
          </Button>
        </Wrapper>
      </StyledForm>
    </Modal>
  );
};

EventForm.propTypes = {
  isOpenModal: PropTypes.bool,
  closeModal: PropTypes.func,
  setEvents: PropTypes.func,
  openToUpdate: PropTypes.bool,
  setOpenToUpdate: PropTypes.func,
  updatedData: PropTypes.shape({
    title: PropTypes.string,
    escription: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    createdAt: PropTypes.number,
    updatedAt: PropTypes.number,
  }),
  setDataToUpdate: PropTypes.func,
};
export default EventForm;

const StyledForm = styled.form`
  width: 500px;
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

const StyledTimeStamp = styled.p`
  font-size: 10px;
  color: grey;
  display: flex;
  flex-direction: column;
`;
