import { api } from "~/utils/api";
import { useRouter } from "next/router";

export const deleteCatalogue = () => {    
    const deleteCatalogue = api.catalogue.deleteCatalogue.useMutation();
    const router = useRouter()
    const { id } = router.query

    if (typeof id !== "string"){
      return;
    }

    deleteCatalogue.mutate({id});

    return<>
    </>
  };