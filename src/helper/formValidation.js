import * as Yup from "yup";

// Form Validation for survery form creating a survey
export const surveyFormSchema = Yup.object({
  Title: Yup.string().required("Survey title is required"),
  Description: Yup.string().required("Description is required"),
  Category: Yup.string().required("Category is required"),
  Deadline: Yup.date()
    .required("Deadline is required")
    .typeError("Invalid date"),
});

// Comment validation for pro users to add his/her comment
export const proUserCommentSchema = Yup.object({
  Comment: Yup.string()
    .required("Comment is required !")
    .test("word-count", "Comment should be within 3-50 words !", (value) => {
      const wordCount = value ? value.trim().split(/\s+/).length : 0;
      return wordCount >= 3 && wordCount <= 50;
    }),
});

// Form Validation for survery form creating a survey---------- Updated
export const manageSurveyFormSchema = Yup.object({
  Title: Yup.string().required("Survey title is required"),
  Description: Yup.string().required("Description is required"),
  Category: Yup.string().required("Category is required"),
  Deadline: Yup.date()
    .required("Deadline is required")
    .typeError("Invalid date"),
  Feedback: Yup.string().required("Feedback is required"),
});
