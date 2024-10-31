import Input from "../../ui/Input";
import Select from "../../ui/Select";
import { useForm, yupResolver } from "../../../../configs/services";
import { maintenanceSchema } from "../../../utils/schemas/properties";
import Button from "../../ui/Button";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { CustomModal } from "../../ui/Modal";
import CreateSuccess from "./CreateSuccess";

const data = [
  { key: 1, label: "Overdue" },
  { key: 2, label: "Upcoming" },
];

function MaintenanceForm() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(maintenanceSchema) });

  function handleFormSubmit(data: {
    facility: string;
    technician: string;
    schedule_date: string;
    status: string;
  }) {
    console.log(data);
  }

  return (
    <div className="max-w-[600px] mx-auto w-full py-10">
      <div className="text-center mb-5">
        <h4 className="text-xl sm:text-2xl mb-1">
          Create Maintenance Schedule
        </h4>
        <p className="text-darkGrey text-sm sm:text-base">
          Fill in the details below to add a new Maintenance Schedule
        </p>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} action="">
        <div className="grid gap-5 md:grid-cols-2 mb-10">
          <Input
            type="text"
            name="facility"
            required={true}
            label="Facility"
            error={errors.facility?.message}
            register={register}
            placeholder="E.g Generator"
            size="lg"
          />
          <Input
            type="text"
            name="technician"
            required={true}
            label="Technician"
            register={register}
            error={errors.technician?.message}
            placeholder="Enter name"
            size="lg"
          />
          <Input
            type="date"
            name="schedule_date"
            required={true}
            label="Schedule Date"
            register={register}
            error={errors.schedule_date?.message}
            size="lg"
            placeholder="Enter date"
          />
          <Select
            name="status"
            data={data}
            register={register}
            error={errors.status?.message}
            label="Task Status:"
            size="lg"
          />
        </div>
        <Button onClick={() => onOpen()} type="submit" className="w-full">
          Create Maintenance Schedule
        </Button>
      </form>
      <CustomModal isOpen={isOpen} onOpenChange={onOpenChange}>
        <CreateSuccess onClose={onClose} />
      </CustomModal>
    </div>
  );
}

export default MaintenanceForm;
