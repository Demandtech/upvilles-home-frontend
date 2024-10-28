import { ChangeEvent, useState } from "react";
import Button from "../../ui/Button";
import { Input } from "@nextui-org/input";
import { NotificationIconSvg, SearchIconSvg } from "../../svgs";
import { debounce } from "../../../utils/debounce";

const Header = ({ title }: { title: string }) => {
  const [searchValue, setSearchValue] = useState("");

  const sendSearchToDatabase = async (query: string) => {
    try {
      console.log("Sending query to database:", query);
    } catch (error) {
      console.error("Error sending search to database:", error);
    }
  };

  const handleSearch = debounce(async (data: string) => {
    setSearchValue(data);
    await sendSearchToDatabase(data);
  }, 500);


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    handleSearch(event.target.value);
  }

  return (
    <div className="bg-lightBg px-3 py-3 sm:py-5 sm:px-5 sticky top-0 z-10">
      <div className="flex gap-3 justify-between items-center">
        <div>
          <h6 className="font-semibold md:text-lg lg:min-w-28">{title}</h6>
        </div>
        <div className="w-full max-w-sm">
          <Input
            startContent={
              <Button
                variant="light"
                className="border-rounded rounded-full"
                size="sm"
                type="button"
                isIconOnly
                disabled
              >
                <SearchIconSvg />
              </Button>
            }
            type="text"
            size="md"
            name="search"
            placeholder="Search property, tenants... "
            required={false}
            onChange={handleChange}
            value={searchValue}
          />
        </div>
        <div>
          <Button
            variant="flat"
            className="border-rounded rounded-full"
            size="md"
            type="button"
            isIconOnly
          >
            <NotificationIconSvg />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
