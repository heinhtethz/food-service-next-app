import { Box, Chip, FormControl, RadioGroup, Typography } from "@mui/material";
import { AddonCategories, Addons } from "@prisma/client";
import AddonComponent from "./AddonComponent";

interface Props {
  validAddonCategories: AddonCategories[];
  validAddons: Addons[];
  selectedAddons: Addons[];
  onChange: (checked: boolean, addon: Addons) => void;
}

const AddonCategoryComponent = ({
  validAddonCategories,
  validAddons,
  selectedAddons,
  onChange,
}: Props) => {
  return (
    <Box>
      {validAddonCategories.map((item) => {
        return (
          <Box key={item.id} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                width: "300px",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ userSelect: "none" }}>{item.name}</Typography>
              <Chip label={item.isRequired ? "Required" : "Optional"} />
            </Box>
            <Box>
              <FormControl>
                <RadioGroup>
                  <AddonComponent
                    addonCategory={item}
                    validAddons={validAddons}
                    selectedAddons={selectedAddons}
                    onChange={onChange}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default AddonCategoryComponent;
