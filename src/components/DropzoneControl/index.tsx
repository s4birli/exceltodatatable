import { useEffect, useRef, useState } from "react";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import Box from "components/controls/Box";
import DropzoneControlRoot from "components/DropzoneControl/DropzoneControlRoot";
import { useMaterialUIController } from "context";
interface Props {
  options: {
    [key: string | number]: any;
  };
  onFilesUploaded: (files: Dropzone.DropzoneFile) => void;
}

function DropzoneControl({ options, onFilesUploaded }: Props): JSX.Element {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const dropzoneRef = useRef<HTMLFormElement | null>(null);
  const [files, setFiles] = useState<Dropzone.DropzoneFile[]>([]);
  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, {
        ...options,
        paramName: "file",
        maxFiles: 1,
      });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0)
        Dropzone.instances.forEach((dz: any) => dz.destroy());
    }

    const dropzone = createDropzone();

    dropzone.on("addedfile", (file: Dropzone.DropzoneFile) => {
      onFilesUploaded(file);
    });

    return () => removeDropzone();
  }, [options]);

  return (
    <DropzoneControlRoot
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <Box className="fallback" bgColor="transparent">
        <input name="file" type="file" />
      </Box>
    </DropzoneControlRoot>
  );
}

export default DropzoneControl;
