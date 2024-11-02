import PropertyForm from "./PropertyForm";
const ManagePropertyWrapper = ({ id }: { id: string }) => {
  return (
    <div className="rounded-md shadow-lg shadow-dark py-5 px-5 lg:px-10 h-[calc(100vh-116px)]  md:h-[calc(100vh-126px)]">
      <PropertyForm id={id} />
    </div>
  );
};

export default ManagePropertyWrapper;
