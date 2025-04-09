import React from "react";
import useNotiStack from "./useNotifyStack";

export default function useSuccessMessage() {
  const { successStack } = useNotiStack();

  const createSuccessMessage = (subject) => {
    successStack(<>{subject} created successfully</>);
  };

  const updateSuccessMessage = (subject) => {
    successStack(<>{subject} updated successfully</>);
  };

  const deleteSuccessMessage = (subject) => {
    successStack(<>{subject} deleted successfully</>);
  };

  return {
    createSuccessMessage,
    updateSuccessMessage,
    deleteSuccessMessage,
  };
}
