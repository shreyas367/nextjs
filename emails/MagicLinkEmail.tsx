// /emails/MagicLinkEmail.tsx

type Props = {
  username: string;
  link: string;
};

export const MagicLinkEmail = ({ username, link }: Props) => {
  return (
    <div>
      <h1>Hello {username} 👋</h1>
      <p>Click the button below to sign in to your account:</p>
      <a href={link}
         style={{
           display: 'inline-block',
           padding: '10px 20px',
           backgroundColor: '#0070f3',
           color: 'white',
           borderRadius: '6px',
           textDecoration: 'none'
         }}>
        Sign in via Magic Link
      </a>
      <p>This link will expire in 15 minutes.</p>
    </div>
  );
};
