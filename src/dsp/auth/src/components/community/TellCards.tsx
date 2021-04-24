import React, { useState, useContext, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { authContext } from "../../auth/AuthContext";
import { getLibraryServer } from '../../config/AuthConfig';
import BreakpointMasonry from "../../layout/BreakpointMasonry";
import TellCard from "./TellCard";
import { ATell, TellModel } from "../../model/TellModel";
import { selectUser } from '../../state/auth';
import { useTypographyStyles } from "../helpers/Styles";

const TellCards = () => {
  const typographyClasses = useTypographyStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [tells, setTells] = useState(new Array<TellModel>());
  const auth = useContext(authContext);
  const user = selectUser();

  useEffect(() => {
    auth.apiRequest({
      url: `${getLibraryServer()}/api/library/tells/published`,
      method: 'GET',
    }).then(resp => {
      if (resp.success) {
        const tells = resp.tells.map(t => new ATell(t));
        setTells(tells);
      }
      else {
        enqueueSnackbar(resp.message, { variant: 'error' })
      }
    })
    .catch(err => {
      console.error(err);
      enqueueSnackbar('Server Error', { variant: 'error' });
    });
  }, []);

  return (
    <>
      <h2 className={typographyClasses.title}>Hear from the Datalayer Community!</h2>
      <BreakpointMasonry>
        {
          tells.map(tell => <TellCard 
              ulid={tell.ulid}
              outputshotUrl={tell.outputshotUrl}
              outputshotData={tell.outputshotData}
              title={tell.title}
              description={tell.description}
              username={tell.username}
              key={tell.ulid}
            />
            )
        }
      </BreakpointMasonry>
    </>
  );
}

export default TellCards;
