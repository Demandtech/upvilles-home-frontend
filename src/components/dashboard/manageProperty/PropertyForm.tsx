import { Image } from "@nextui-org/image";
import img from "../../../assets/images/house-img.png";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { FileUpload } from "../../svgs";
import Button from "../../ui/Button";
import { useForm, yupResolver } from "../../../../configs/services";
import { managePropertySchema } from "../../../utils/schemas/properties";
import useProperty from "../../../hooks/useProperty";
import { ManagePropertyFormState } from "../../../types/forms";
import ManagementModal from "../properties/ManagePropertySuccessModal";
import { useDisclosure } from "@nextui-org/use-disclosure";
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { CustomModal } from "../../ui/Modal";

const typesData = [
  { key: "Residential", label: "Residential" },
  { key: "Commercial", label: "Commercial" },
];

const PropertyForm = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(managePropertySchema(id)),
  });
  const queryClient = useQueryClient();

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const { addProperty, editProperty, getSingleProperty } = useProperty();

  const handleManageProperty = (data: ManagePropertyFormState) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === "images") {
        Array.from(val).forEach((file) => {
          if (file instanceof File) {
            formData.append("images", file);
          }
        });
      } else if (val !== undefined) {
        formData.append(key, val);
      }
    });

    mutation.mutate(
      id ? { updateProperty: formData, productId: id } : formData
    );
  };

  const mutation = useMutation({
    mutationFn: async (
      variables: FormData | { updateProperty: FormData; productId: string }
    ) => {
      if (typeof variables === "object" && variables !== null) {
        if ("productId" in variables) {
          return await editProperty(
            variables.productId,
            variables.updateProperty
          );
        } else if (variables instanceof FormData) {
          return await addProperty(variables);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["single_propert", id] });
      onOpen();
    },
    onError: (error) => {
      console.log("Error: ", error);
    },
  });

  const { data: singleProperty } = useQuery<AxiosResponse, Error>({
    queryKey: ["single_property"],
    queryFn: () => getSingleProperty(id),
    enabled: !!id,
  } as UseQueryOptions<AxiosResponse, Error>);

  useEffect(() => {
    if (!id) return;

    if (singleProperty?.data) {
      reset(singleProperty.data);
    }
  }, [singleProperty, setValue]);

  return (
    <section className="flex flex-col lg:flex-row h-full overflow-auto scrollbar-hide">
      <div className="lg:w-2/5 ">
        <div className="lg:mt-10 flex justify-center">
          <Image src={img} />
        </div>
      </div>
      <div className="lg:w-3/5 lg:pl-10  lg:overflow-y-auto scrollbar-hide py-5">
        <div className="text-center mb-5">
          <h3 className="text-center  text-lg md:text-xl mb-1.5">
            {id ? "Edit" : "Add"} Your Property Information
          </h3>
          <p className="text-darkGrey text-sm">
            Update property details to keep information accurate and up-to-date.
          </p>
        </div>
        <form
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleManageProperty)}
        >
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <Input
              required={true}
              label="Property Title"
              type="text"
              name="title"
              size="md"
              placeholder="Enter property title"
              register={register}
              error={errors.title?.message}
            />
            <Input
              required={true}
              label="Location"
              type="text"
              name="location"
              size="md"
              placeholder="Enter property location"
              register={register}
              error={errors.location?.message}
            />
            <Input
              label="Street / Road / Estate"
              type="text"
              name="street"
              size="md"
              required={true}
              placeholder="Enter property address"
              register={register}
              error={errors.street?.message}
            />
            <Select
              name="property_type"
              register={register}
              data={typesData}
              label="Property Type:"
              error={errors.property_type?.message}
              defaultValue={getValues("property_type")}
            />

            <Input
              label="Number of Units"
              type="text"
              name="unit_number"
              size="md"
              required={true}
              placeholder="Enter units number"
              register={register}
              error={errors.unit_number?.message}
            />
            <Input
              label="Side Attraction"
              type="text"
              name="attraction"
              size="md"
              required={false}
              placeholder="Enter side attractions"
              register={register}
              error={errors.attraction?.message}
              optionalColor="text-darkGrey"
            />
          </div>
          <div className="space-y-5">
            <div>
              <label className="block mb-1.5">
                Property image(s)
                <span className="font-light text-xs text-darkGrey">
                  (Minimum of 25 pictures)
                </span>
                :
              </label>
              <div className="border-2 bg-[#A4A4A41A] py-5 rounded-md border-darkGrey border-dotted w-full block">
                <label className="" htmlFor="img-upload">
                  <input
                    type="file"
                    id="img-upload"
                    hidden
                    accept="image/*"
                    multiple
                    {...register("images")}
                  />
                  <div className="flex flex-col gap-1 items-center">
                    <FileUpload />
                    <p>Upload an image</p>
                    <p className="text-xs text-darkGrey">
                      or click to browse(4 MB max)
                    </p>
                  </div>
                </label>
              </div>
              {errors.images && (
                <p className="text-danger text-xs">{errors.images.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="description" className="block mb-1.5">
                Property Description:
              </label>
              <textarea
                className="bg-[#A4A4A41A] p-3 rounded-md w-full resize-none min-h-[100px]"
                id="description"
                placeholder="Enter description"
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="text-danger text-xs">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <Button
              isLoading={mutation.isPending}
              type="submit"
              className="w-full"
            >
              {id ? "Edit" : "Add"} Property Details
            </Button>
          </div>
        </form>
      </div>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ManagementModal
          message={
            id ? "Property Updated successfully" : "Property Added successfully"
          }
          onClose={onClose}
        />
      </CustomModal>
    </section>
  );
};

export default PropertyForm;
