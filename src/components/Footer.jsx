import React from 'react';
import { Box, Container, IconButton, Stack } from '@mui/material';
import { NavLink } from "react-router-dom";
import { paths } from '../constant/Paths';


const Footer = () => {
    return (
        <div className='border-t border-t-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] bg-[#d4d4d5]'>
            <section className='max-w-6xl mx-auto'>
                <Box sx={{ color: 'black', py: 1.5 }}>
                    <Container>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            {/* <NavLink to={paths.home} className="text-2xl font-bold mb-1 text-center text-[#040174]">
                            Socialh<span className='text-[#ffc104] text-3xl'>o</span>p 👀
                            <hr className="text-gray-300 mt-1" />
                        </NavLink> */}

                            {/* <Stack direction="row" spacing={1}>
                            {[FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon].map((Icon, i) => (
                                <IconButton
                                    key={i}
                                    color="inherit"
                                    href="#"
                                    aria-label={`Social icon ${i}`}
                                    sx={{
                                        color: 'black',
                                        transition: 'color 0.3s',
                                        '&:hover': {
                                            color: '#1565C0',
                                        },
                                    }}
                                >
                                    <Icon />
                                </IconButton>
                            ))}
                        </Stack> */}

                            <div className="text-center text-sm text-[#000000] font-medium md:mt-0">
                                © {new Date().getFullYear()}
                                <NavLink to={paths.home} className="text-[#040174] mx-1 border-b border-b-gray-500">
                                    Socialh<span className='text-[#ffc104]'>o</span>p
                                </NavLink> All rights reserved.
                            </div>

                        </Stack>
                    </Container>
                </Box>
            </section>
        </div>
    );
};

export default Footer;
