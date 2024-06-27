import Image from 'next/image';

// Assuming uploadedFiles is defined and contains at least one file
const ReviewImage = ({ uploadedFiles }: any) => {
    console.log({uploadedFiles});
    
  // Ensure uploadedFiles is not empty before accessing the first element
  const firstFile = uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles[0] : null;

  // Check if firstFile is defined before rendering
  if (!firstFile) {
    return null; // or handle the case where there are no uploaded files
  }

  // Assuming firstFile is either a path or a file object with a 'url' property
  const imageUrl = typeof firstFile === 'string' ? firstFile : firstFile.url;

  return (
    <Image
      src={imageUrl}
      alt="review"
      width={500}
    />
  );
};

export default ReviewImage;
