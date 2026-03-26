import React from 'react';

const HealthCheckPage = () => {
    const styles = {
        overlay: {
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1e293b',
        },
        card: {
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        maxWidth: '480px',
        width: '90%',
        },
        statusBadge: {
        display: 'inline-block',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '600',
        marginBottom: '1.5rem',
        },
        title: {
        fontSize: '1.875rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: '#0f172a',
        },
        text: {
        lineHeight: '1.625',
        marginBottom: '2rem',
        color: '#64748b',
        },
        button: {
        display: 'inline-block',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        padding: '0.75rem 1.5rem',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'background-color 0.2s',
        }
    };

    const email = "alexandrai20162008@gmail.com";
    const handleEmailClick = (e) => {
        e.preventDefault();
        
        const recipient = "alexandrai20162008@gmail.com";
        const subject = encodeURIComponent("Вопрос по проекту Кроссворд");
        const body = encodeURIComponent("Здравствуйте! Я по поводу вашего проекта...");

        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;
        
        window.open(gmailUrl, '_blank');
    };
    return (
        <div style={styles.overlay}>
        <div style={styles.card}>
            <div style={styles.statusBadge}>● Server Offline</div>
            
            <h1 style={styles.title}>Упс! Сервер отдыхает</h1>
            
            <p style={styles.text}>
            Данный проект является <strong>учебным</strong>, поэтому сервер сейчас не активен. 
            Если у вас есть вопросы или предложения, я на связи!
            </p>

            <a 
            href={`mailto:${email}`} 
            style={styles.button}
            onClick={handleEmailClick}
            onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
            Написать мне на почту
            </a>
        </div>
        </div>
    );
};

export default HealthCheckPage;