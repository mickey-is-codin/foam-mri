import React from 'react';
import * as showdown from 'showdown';
import ReactHTMLParser from 'react-html-parser';
import { Note } from '../util/types';
import { sidebarStyle } from '../styles/sidebarStyle';

interface SidebarProps {
  sidebarNote: Note | undefined;
  updateSidebarNote: any;
};

interface NoteContentProps {
  sidebarNote: Note
};

const NoteContent = (props: NoteContentProps): JSX.Element | null => {
  const { sidebarNote: { content } } = props;
  if (Array.isArray(content)) return null;

  const converter = new showdown.Converter();
  const html = converter.makeHtml(content);

  return (
    <>
      {ReactHTMLParser(html)}
    </>
  );
};

const Sidebar = (props: SidebarProps): JSX.Element | null => {

  const { sidebarNote, updateSidebarNote } = props;

  if (!sidebarNote) return null;

  return (
    <>
      <div style={sidebarStyle}>
        Note
        <button
          onClick={() => updateSidebarNote(undefined)}
        >
          Close
        </button>
        <NoteContent sidebarNote={sidebarNote} />
      </div>
    </>
  );
};

export default Sidebar;