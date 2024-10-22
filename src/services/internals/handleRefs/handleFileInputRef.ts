export const handleFileInputRef = (fileInputRef: React.RefObject<HTMLInputElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };