import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { creatcustomers, updatecustomer } from "../../../redux/actions/actionCustomer";
import { TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { validationSchema } from "../../../validations/CustomerValidation";
import useStyles from "../../../styles/js/Form";
const initialvalue = {
  fullname: "", age: "", email: "", phone: "", address: "", gender: "",
};
const FormCustomer = ({ currentId, setcurrentId, title }) => {
  console.log(currentId)
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.customers.find((p) => p._id === currentId) : null
  );
  const Edit = title === "Update Customer" ? true : false;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (currentId) { 
        dispatch(updatecustomer(values, currentId));
        setcurrentId(0);
       
      } else {
        dispatch(creatcustomers(values));
      }
      setSubmitting(false);
      resetForm({});
    },
  });

  useEffect(() => {
    if (post) formik.setValues(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField type="text" name="fullname" label="Full Name" variant="outlined" fullWidth className={classes.TextField} value={formik.values.fullname} onChange={formik.handleChange} error={formik.touched.fullname && Boolean(formik.errors.fullname)} helperText={formik.touched.fullname && formik.errors.fullname} />
      <TextField type="email" name="email" label="Email" variant="outlined" fullWidth className={classes.TextField} value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
      <TextField type="number" name="phone"label="phone" variant="outlined"  fullWidth className={classes.TextField}  value={formik.values.phone} onChange={formik.handleChange} error={formik.touched.phone && Boolean(formik.errors.phone)} helperText={formik.touched.phone && formik.errors.phone} />
      <TextField type="number" name="age" label="age"variant="outlined" fullWidth className={classes.TextField}  value={formik.values.age} onChange={formik.handleChange} error={formik.touched.age && Boolean(formik.errors.age)} helperText={formik.touched.age && formik.errors.age} />
      <TextField type="text" name="address" label="address" variant="outlined"fullWidth className={classes.TextField}  value={formik.values.address} onChange={formik.handleChange} error={formik.touched.address && Boolean(formik.errors.address)} helperText={formik.touched.address && formik.errors.address} />
      <TextField type="text" name="gender"  label="Gender" variant="outlined"fullWidth className={classes.TextField} value={formik.values.gender} onChange={formik.handleChange} error={formik.touched.gender && Boolean(formik.errors.gender)} helperText={formik.touched.gender && formik.errors.gender} />
      <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>
        {Edit ? "UPDATE" : "CREATE"}
      </Button>
    </form>
  );
};
export default FormCustomer;