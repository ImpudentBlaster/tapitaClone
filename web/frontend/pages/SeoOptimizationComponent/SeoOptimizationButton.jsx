import React, { useState } from "react";
import { Modal, Button, TextField, Stack, Checkbox } from "@shopify/polaris";

const SeoOptimizationButton = () => {
  const [active, setActive] = useState(false);
  const [focusKeyword, setFocusKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [forceTitleCut, setForceTitleCut] = useState(false);
  const [forceDescriptionCut, setForceDescriptionCut] = useState(false);

  const handleChange = () => setActive(!active);

  const handleSave = () => {
    // Handle save logic here
    console.log({
      focusKeyword,
      metaTitle,
      metaDescription,
      forceTitleCut,
      forceDescriptionCut,
    });
    setActive(false);
  };

  return (
    <div>
      <Button onClick={handleChange}>Click</Button>

      <Modal
        open={active}
        onClose={handleChange}
        title="Classic T Shirt for Men and Women | Stylish Cotton Tee for Everyday"
        primaryAction={{
          content: "Save",
          onAction: handleSave,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            <TextField
              label="Focus keyword (optional)"
              value={focusKeyword}
              onChange={(value) => setFocusKeyword(value)}
              placeholder="shirt"
            />
            <TextField
              label="Meta title"
              value={metaTitle}
              onChange={(value) => setMetaTitle(value)}
              placeholder="Classic T Shirt for Men and Women | Stylish Cotton Tee for Everyday"
            />
            <Checkbox
              label="Force cut meta title length if longer than 70 characters"
              checked={forceTitleCut}
              onChange={(checked) => setForceTitleCut(checked)}
            />
            <TextField
              label="Meta description"
              value={metaDescription}
              onChange={(value) => setMetaDescription(value)}
              placeholder="Shop the latest collection of trendy t shirts for men and women. Find your perfect shirt today!"
              multiline={3}
            />
            <Checkbox
              label="Force cut meta description length if longer than 160 characters"
              checked={forceDescriptionCut}
              onChange={(checked) => setForceDescriptionCut(checked)}
            />
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
};

export default SeoOptimizationButton;
