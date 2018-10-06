# Interdude

A web app for mock interviews

## Description

There is a massive demand for a service that can allow 4th year students take mock personal
interviews. However, there is no online service that can take your mock personal interview.
Interdude allows you to get a technical mock test done online. Interdude will make pairs of
candidates and then allow them to take each other’s mock interview. The candidates do not
need to make the questions, the app will provide it. All they need to do is, rate each other
and voila! you have your tech interview practice on point. 

## Details

1. Web application for practising mock interviews
2. Interviews will be between participants where one participant acts as interviewee and other
as interviewer, in real time through agora RTC.
3. Options of interview -- Screen share, Voice call, Video Call
4. In case of voice or video call, screen share will also be there at side showing the code that
interviewee is writing.
5. Real time marking portal (visible to interviewer only)
6. Side chat menu using sockets (just in case xD).
7. Point based system which will increase your respect and rapport in the community

## Tech Stack and APIs 

- NodeJS for backend
- Web sockets for Chats
- Agora AP
- Calls are completely secure and private, End-to-end calls are HIPAA compliant
and supported by 256-bit encryption. (Directly given to us by Agora)
- Ace editor for frontend text editor
- A compiler (probably hackerrank API for now)
- Secure database