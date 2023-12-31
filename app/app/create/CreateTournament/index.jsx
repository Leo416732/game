import { getTournamentFactoryContract } from "../../contracts/TournamentFactoryContractHelper";
import { parse18 } from "../../contracts/helpers";
import MButton from "../../../components/Button";
import MInput from "../../../components/Input";
import MText from "../../../components/Text";
import { createTournamentAPI } from "../../../services/getService";
import { Stack, Text } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import moment from "moment";
import { useToast } from "@chakra-ui/react";
import * as Yup from "yup";

export default function CreateTournament() {
  const toast = useToast();

  const createTournament = async (values) => {
    try {
      const { name, admin, endTime, desc, image } = values;
      const { tournamentFactoryWriteContract, tournamentFactoryReadContract } =
        await getTournamentFactoryContract();
      let tournamentDetails = [name, image];
      let dateEnd = moment(endTime).unix();
      let endtime = dateEnd - Math.floor(Date.now() / 1000);
      const percent = 90;
      const wei = parse18(percent);
      const tx = await tournamentFactoryWriteContract.createTournament(
        admin,
        endtime,
        wei,
        tournamentDetails
      );
      await tx.wait();
      let tournamentLength =
        await tournamentFactoryReadContract.getTournamentLength();
      let tournamentAddress =
        await tournamentFactoryReadContract.getTournamentAddress(
          tournamentLength
        );
      const present = new Date();
      const outputPresent = `${present.getFullYear()}/${
        present.getMonth() + 1
      }/${present.getDate()} ${present.getHours()}:${present.getMinutes()}:`;
      const date = new Date(endTime);
      const output = `${date.getFullYear()}/${
        date.getMonth() + 1
      }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

      let data = JSON.stringify({
        address: tournamentAddress,
        name: name,
        description: desc,
        image: image,
        token_id: 1,
        live_price: 0.01,
        start_datetime: `${outputPresent}59`,
        end_datetime: output,
        toy_ids: [1, 3],
        winner_percentage: 90,
      });
      const res = await createTournamentAPI(data);
      toast({
        title: "Tournament created.",
        description: "We've created tournament.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return res;
    } catch (err) {
      console.log("err: ", err.reason);
      toast({
        title: "Tournament not created.",
        description: `${err.reason}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return null;
    }
    // finally {
    //   // setIsLoading(false);
    //   navigate("/");
    // }
  };

  const createSchema = Yup.object().shape({
    admin: Yup.string()
      .min(40, "Address is too short!")
      .max(50, "Address is too long!")
      .required("Admin address is required"),
    name: Yup.string().min(2, "Too Short!").required("Name is required"),
    endTime: Yup.string().required("Time is required"),
    desc: Yup.string().required("Description is required"),
    image: Yup.string().required("Image url is required"),
  });

  return (
    <Formik
      className="w-full"
      validationSchema={createSchema}
      initialValues={{ name: "", admin: "", endTime: "", desc: "", image: "" }}
      onSubmit={async (values, actions) => {
        await createTournament(values);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <Form className="w-full max-w-2xl">
          <Stack align="center" my="10">
            <MText title={true} text={"Create Tournament"} />
          </Stack>
          <Stack spacing="4">
            <Field name="admin">
              {({ field, form }) => {
                return (
                  <>
                    <MInput {...field} placeholder="Admin address" />
                    <Text color="rgba(255,145,0,.831)">
                      {form.touched.admin && form.errors.admin}
                    </Text>
                  </>
                );
              }}
            </Field>
            <Field name="name">
              {({ field, form }) => (
                <>
                  <MInput {...field} placeholder="Name" />
                  <Text color="rgba(255,145,0,.831)">
                    {" "}
                    {form.touched.name && form.errors.name}
                  </Text>
                </>
              )}
            </Field>
            <Field name="endTime">
              {({ field, form }) => (
                <>
                  <MInput
                    {...field}
                    placeholder="Tournament End Time"
                    type="datetime-local"
                  />
                  <Text color="rgba(255,145,0,.831)">
                    {form.touched.endTime && form.errors.endTime}
                  </Text>
                </>
              )}
            </Field>
            <Field name="desc">
              {({ field, form }) => (
                <>
                  <MInput {...field} placeholder="Description" />
                  <Text color="rgba(255,145,0,.831)">
                    {form.touched.desc && form.errors.desc}
                  </Text>
                </>
              )}
            </Field>
            <Field name="image">
              {({ field, form }) => (
                <>
                  <MInput {...field} placeholder="IMAGE" />
                  <Text color="rgba(255,145,0,.831)">
                    {form.touched.image && form.errors.image}
                  </Text>
                </>
              )}
            </Field>
          </Stack>
          <MButton
            w="full"
            mt="5"
            text={"Submit"}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          />
        </Form>
      )}
    </Formik>
  );
}
