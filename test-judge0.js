import axios from 'axios';

async function testJudge0() {
    try {
        // Simple JavaScript test
        const code = `console.log('0 1');`;
        
        const input = '2 7 11 15\n9';
        
        console.log('Creating submission...');
        const createResponse = await axios.post('http://localhost:2358/submissions?base64_encoded=false&wait=true', {
            source_code: code,
            language_id: 63, // JavaScript
            stdin: input
        });
        
        console.log('Response:', JSON.stringify(createResponse.data, null, 2));
        
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testJudge0();
