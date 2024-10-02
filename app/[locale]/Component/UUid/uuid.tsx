import crypto from 'crypto';

function hashNicknameToUUID(nickname: string): string {
    const hashed = crypto.createHash('md5').update(nickname).digest('hex');
    return (
        `${hashed.substring(0, 8).toUpperCase()}-${hashed.substring(8, 12).toUpperCase()}-` +
        `${hashed.substring(12, 16).toUpperCase()}-${hashed.substring(16, 20).toUpperCase()}-` +
        `${hashed.substring(20, 32).toUpperCase()}`
    );
}

export default hashNicknameToUUID;