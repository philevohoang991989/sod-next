import PageLayout from "@/components/PageLayout";
import InfoVideo from "../info-video";

export default function DetailVideo() {
  const backPage=()=>{
    console.log('backPage');
    
  }
  return (
    <PageLayout title="Edit Seminar" btnBack={true} link='/browse/video/list'>
      Detail video
      <InfoVideo />
    </PageLayout>
  );
}
