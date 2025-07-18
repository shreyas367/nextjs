// emails/VerificationEmail.tsx
import React from 'react';
import { } from '@react-email/components';

import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Section,
} from '@react-email/components';

type VerificationEmailProps = {
  username: string;
  otp: string;
};

export const VerificationEmail = ({ username, otp }: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Welcome, {username}! 🎉</Heading>
          <Section>
            <Text style={text}>
              Thank you for signing up. Use the code below to verify your email address:
            </Text>
            <Text style={otpBox}>{otp}</Text>
            <Text style={text}>
              This code will expire in 10 minutes. If you didn’t request this, you can safely ignore this email.
            </Text>
            <Text style={footer}>– The SHREYAS App Team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// ✅ Inline styles
const main = {
  backgroundColor: '#f9f9f9',
  padding: '40px 0',
};

const container = {
  backgroundColor: '#ffffff',
  padding: '40px',
  borderRadius: '8px',
  maxWidth: '520px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center' as const,
};

const text = {
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '16px',
};

const otpBox = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1a73e8',
  letterSpacing: '4px',
  textAlign: 'center' as const,
  padding: '12px 0',
};

const footer = {
  fontSize: '14px',
  color: '#999',
  marginTop: '32px',
  textAlign: 'center' as const,
};
