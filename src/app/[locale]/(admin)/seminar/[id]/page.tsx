import PageLayout from "@/components/PageLayout";

export default function Page({ params }: { params: { id: string } }) {
    return  <PageLayout title="Edit Seminar">My Post: {params.id}</PageLayout>
  }