import React, { useCallback, useContext, useEffect } from 'react';
import { Button, Image, View } from 'react-native';

import Settings from '@Ruume/assets/icons/settings.svg';
import { supabase } from '@Ruume/clients/supabase';
import { CreateRuumeDrawer } from '@Ruume/components/drawer';
import { useGetAvatar, useGetProfileById, useGetSession } from '@Ruume/hooks';
import { useGetRuume } from '@Ruume/hooks/ruumes/useGetRuume';
import { logger } from '@Ruume/services/logging';
import { drawerStateAtom } from '@Ruume/store/ui/drawerStateAtom';
import { DispatcherKeys } from '@Ruume/types/logging/DispatcherKeys';
import { BaseText } from '@Ruume/ui';
import { vh } from '@Ruume/utils/viewport';

import { StatusBar } from 'expo-status-bar';
import { useSetAtom } from 'jotai';
import styled, { ThemeContext } from 'styled-components/native';

const StyledHomeContainer = styled(View)`
  height: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme?.background};
`;

export default function RuumeHome() {
  const theme = useContext(ThemeContext);
  const setDrawerState = useSetAtom(drawerStateAtom);

  const { data: session } = useGetSession();
  const { data: profile } = useGetProfileById(session?.user?.id);
  const { data: avatar, isPending: avatarLoading } = useGetAvatar(profile?.avatar_url);
  const { data: ruume } = useGetRuume();

  const mockSignOut = useCallback(async () => {
    logger.dispatch('Signing out', DispatcherKeys.ERROR, {
      component: 'RuumeHome',
      userId: session?.user?.id,
      userMetadata: { ...session?.user?.user_metadata },
      profileId: profile?.id,
    });
    await supabase.auth.signOut({ scope: 'local' });
  }, [profile?.id, session?.user?.id, session?.user?.user_metadata]);

  useEffect(() => {
    console.log('RUUME payload', ruume);
    let timeout: NodeJS.Timeout;
    if (!ruume) {
      timeout = setTimeout(() => {
        setDrawerState({
          visible: true,
          content: <CreateRuumeDrawer />,
          breakPoints: { expanded: vh * 95, quarter: vh * 75, half: vh * 50, collapsed: vh * 25 },
        });
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [ruume, setDrawerState]);

  return (
    <StyledHomeContainer>
      <StatusBar style="light" />
      <BaseText type="default" style={{ color: theme?.text }}>
        Welcome to Ruume Home!
      </BaseText>

      <Settings width={24} height={24} fill="white" />
      <Button title="Sign Out" onPress={mockSignOut} />
      <Button
        title="Open drawer"
        onPress={() =>
          setDrawerState({
            visible: true,
            breakPoints: { expanded: vh * 95, collapsed: vh * 50 },
            content: <CreateRuumeDrawer />,
          })
        }
      />
      {!avatarLoading && avatar && (
        <Image
          style={{ width: 275, height: 275, alignSelf: 'center' }}
          source={{ uri: avatar + `?${Date.now()}`, cache: 'reload' }}
        />
      )}
    </StyledHomeContainer>
  );
}
