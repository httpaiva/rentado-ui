import {
  Content,
  Dialog,
  Divider,
  Heading as SpectrumHeading,
  Form,
  TextField,
} from "@adobe/react-spectrum";
import { useForm, Controller } from "react-hook-form";
import { API_BASE_URL } from "@/constants";
import { Button } from "@/components";
import { Location } from "@/types/Location";

type Props = {
  location: Location;
};

export default function CreateLocationModal({ location }: Props) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: location.name,
      country: location.country,
      state: location.state,
      city: location.city,
      neighborhood: location.neighborhood,
      street: location.street,
      number: location.number,
      postalCode: location.postalCode,
      complement: location.complement,
    },
  });

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("access_token");

    const response = await fetch(`${API_BASE_URL}/locations/${location.id}`, {
      method: "PATCH",
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

  const onDelete = async () => {
    const token = localStorage.getItem("access_token");

    const confirmation = window.confirm(
      "Tem certeza que deseja deletar esse imóvel?",
    );

    if (confirmation) {
      const response = await fetch(`${API_BASE_URL}/locations/${location.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Imóvel deletado com sucesso!");
        window.location.reload();
      } else {
        const responseData = await response.json();
        const { error, message } = responseData;
        alert(message);
      }
    }
  };

  return (
    <Dialog>
      <SpectrumHeading>Editar Imóvel</SpectrumHeading>
      <Divider />
      <Content>
        <Form isRequired width="size-4600" onSubmit={handleSubmit(onSubmit)}>
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

          <Button type="submit">Editar imóvel</Button>
        </Form>

        <Button onClick={onDelete} variant="destructive">
          Deletar Imóvel
        </Button>
      </Content>
    </Dialog>
  );
}
