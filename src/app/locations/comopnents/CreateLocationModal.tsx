import {
  Content,
  Dialog,
  Divider,
  Heading as SpectrumHeading,
  Form,
  TextField,
} from "@adobe/react-spectrum";
import { useForm, Controller } from "react-hook-form";
import { BASE_URL } from "@/constants";
import Button from "@/components/Button";

export default function CreateLocationModal() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      name: "",
      country: "",
      state: "",
      city: "",
      neighborhood: "",
      street: "",
      number: "",
      postalCode: "",
      complement: "",
    },
  });

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${BASE_URL}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (response.ok) {
      alert("Imóvel cadastrado com sucesso!");
      window.location.reload();
    } else {
      const { error, message } = responseData;
      alert(message);
    }
  };

  return (
    <Dialog>
      <SpectrumHeading>Novo Imóvel</SpectrumHeading>
      <Divider />
      <Content>
        <Form width="size-4600" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Nome é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Nome"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="country"
            rules={{ required: "País é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="País"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            rules={{ required: "Estado é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Estado"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            rules={{ required: "Cidade é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Cidade"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="neighborhood"
            rules={{ required: "Bairro é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Bairro"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="street"
            rules={{ required: "Rua é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Rua"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="number"
            rules={{ required: "Número é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Número"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="postalCode"
            rules={{ required: "CEP é obrigatório" }}
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="CEP"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                isRequired
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="complement"
            render={({
              field: { name, value, onChange, onBlur, ref },
              fieldState: { invalid, error },
            }) => (
              <TextField
                label="Complemento"
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                errorMessage={error?.message}
              />
            )}
          />

          <Button type="submit">Criar imóvel</Button>
        </Form>
      </Content>
    </Dialog>
  );
}
