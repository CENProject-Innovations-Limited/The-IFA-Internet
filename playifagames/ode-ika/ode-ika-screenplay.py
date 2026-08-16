#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ÒDÈÌKÁ — Full Screenplay Generator
Produces a properly formatted PDF screenplay from Odu Ifa Ìká Méjì.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer,
                                 PageBreak, KeepTogether)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.lib import colors
import os

# ── Fonts ────────────────────────────────────────────────────────────────────
FONT_REG  = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf'

pdfmetrics.registerFont(TTFont('Mono',     FONT_REG))
pdfmetrics.registerFont(TTFont('MonoBold', FONT_BOLD))

# ── Page geometry (standard screenplay) ──────────────────────────────────────
PW, PH   = letter                  # 8.5 × 11 in
LM       = 1.5 * inch              # left  margin
RM       = 1.0 * inch              # right margin
TM       = 1.0 * inch              # top   margin
BM       = 1.0 * inch              # bottom margin
TW       = PW - LM - RM           # 6 in  text width
PT       = 12                      # base  font size

# ── Paragraph styles ─────────────────────────────────────────────────────────
def ps(name, font='Mono', size=PT, leading=None, indent=0, rindent=0,
       align=TA_LEFT, spaceBefore=0, spaceAfter=0, bold=False):
    return ParagraphStyle(
        name,
        fontName='MonoBold' if bold else font,
        fontSize=size,
        leading=leading or size * 1.2,
        leftIndent=indent,
        rightIndent=rindent,
        alignment=align,
        spaceBefore=spaceBefore,
        spaceAfter=spaceAfter,
        textColor=colors.black,
    )

S = {
    'scene'   : ps('scene',   bold=True,  spaceBefore=18, spaceAfter=6),
    'action'  : ps('action',  spaceAfter=6),
    'char'    : ps('char',    bold=True,  indent=2.2*inch, spaceBefore=12),
    'paren'   : ps('paren',   indent=1.6*inch, rindent=2.0*inch),
    'dial'    : ps('dial',    indent=1.0*inch, rindent=1.0*inch, spaceAfter=6),
    'note'    : ps('note',    indent=1.0*inch, rindent=1.0*inch, spaceAfter=6),
    'trans'   : ps('trans',   bold=True,  align=TA_RIGHT, spaceBefore=6, spaceAfter=6),
    'center'  : ps('center',  align=TA_CENTER, spaceBefore=6, spaceAfter=6),
    'act'     : ps('act',     bold=True,  size=PT+1, align=TA_CENTER,
                              spaceBefore=24, spaceAfter=12),
    'title'   : ps('title',   bold=True,  size=18,   align=TA_CENTER,
                              spaceBefore=2.0*inch, spaceAfter=18),
    'subtitle': ps('subtitle',size=PT,    align=TA_CENTER, spaceAfter=8),
    'small'   : ps('small',   size=10,   align=TA_CENTER, spaceAfter=4),
    'fade_in' : ps('fade_in', bold=True,  spaceBefore=12, spaceAfter=6),
}

# ── Page-number callback ──────────────────────────────────────────────────────
def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFont('Mono', 10)
    canvas.drawRightString(PW - RM, PH - TM + 0.4*inch,
                           f"{doc.page}.")
    canvas.restoreState()

# ── Helper: wrap text to ~58 chars for action/dial lines ─────────────────────
def P(style_key, text):
    return Paragraph(text, S[style_key])

def SP(h=0.1):
    return Spacer(1, h * inch)

# ── Screenplay content ────────────────────────────────────────────────────────
def build_story():
    s = []

    # ── TITLE PAGE ────────────────────────────────────────────────────────────
    s += [
        P('title',   'ÒDÈ-ÌKÁ'),
        SP(0.2),
        P('subtitle','Written by CENProject and Babalawo Ajetumobi Esubiyi Obakolawole'),
        SP(0.1),
        P('subtitle','Based on Odu Ifa Ìká Méjì'),
        SP(0.5),
        P('small',   'A Yoruba-language Epic Feature Film'),
        P('small',   'Produced at the intersection of Ifa, Art, Science &amp; Game'),
        SP(2.0),
        P('small',   'ifainternet.org  |  playifagames.org'),
        PageBreak(),
    ]

    # ── FADE IN ───────────────────────────────────────────────────────────────
    s += [P('fade_in', 'FADE IN:'), SP(0.1)]

    # ═════════════════════════════════════════════════════════════════════════
    #  ACT ONE — ÌBẸ̀RẸ̀ (THE FRONTIER)
    # ═════════════════════════════════════════════════════════════════════════
    s += [P('act', 'ACT ONE — ÌBẸ̀RẸ̀\n(THE FRONTIER)')]

    # ── SEQUENCE 1: OPENING POEM ──────────────────────────────────────────────
    s += [
        P('scene', 'EXT. THE FRONTIER — DARKNESS — BEFORE DAWN'),
        P('action', 'Darkness. Complete. Total. The world before seeing.'),
        P('action', 'Then — a voice. Old. Measured. Unhurried. It speaks in Yoruba. '
                    'English subtitles appear below, clean and white.'),
        SP(),
        P('char', 'VOICE (V.O.)'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Mo de Òde Ìká —'),
        P('note',  '[SUBTITLE: I arrive at the Frontier of Ìká —]'),
        SP(),
        P('action', 'On the word: a vast frontier landscape materializes from darkness. '
                    'Ancient city walls seen from outside — massive, layered, inscribed. '
                    'We are arriving somewhere formidable. The walls pulse faintly with '
                    'a light that is not fire.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Òde Ìkà —'),
        P('note',  '[SUBTITLE: The Frontier of Cruelty —]'),
        SP(),
        P('action', 'FLASH: the same city walls, now seen through a lens of violence — '
                    'the stone edges sharper, the shadows deeper. Same city. Different perception.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Òde Àká —'),
        P('note',  '[SUBTITLE: The Frontier of the Woven Thread —]'),
        SP(),
        P('action', 'FLASH: the same walls, now seen through threads — looms visible '
                    'everywhere, cloth patterns woven into the stone itself.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Òde Ònkà —'),
        P('note',  '[SUBTITLE: The Frontier of Counting —]'),
        SP(),
        P('action', 'FLASH: the same city, now numerical — the walls covered in marks, '
                    'patterns, configurations. Mathematics in the architecture.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Níbití orúkọ wọn rí kakaka —'),
        P('note',  '[SUBTITLE: Where their names are many-layered and intricate —]'),
        SP(),
        P('action', 'Names appear on the city walls: carved, chalked, woven, pressed into '
                    'clay, painted in indigo. Dozens of names. Hundreds. Layered atop each '
                    'other. A palimpsest of identities.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí ọba wọn ń\'gbé ní káà —'),
        P('note',  '[SUBTITLE: Where their king dwells within the innermost chamber —]'),
        SP(),
        P('action', 'A king — seen from a great distance, from outside a system of '
                    'chambered walls. Each wall opens to reveal another wall behind it. '
                    'He is at the center. We cannot see his face. He is deep inside '
                    'something we have not yet earned the right to see.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí o ń\'dáfá pẹ̀lú orí ọká —'),
        P('note',  '[SUBTITLE: Who casts divination with the head of the cobra snake —]'),
        SP(),
        P('action', 'A divination tray — the circular Ifa tray, dusted with Iyerosun '
                    'powder. Hands we do not yet recognize tracing marks across the '
                    'powder with what appears to be a bone — dry, precise. The cobra\'s '
                    'severed head. A tool, not a trophy.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí ìbakà talákáa léjìká —'),
        P('note',  '[SUBTITLE: Where the donkey struck the man named Lákáa upon '
                   'the shoulder —]'),
        SP(),
        P('action', 'FLASH: a large gray donkey. A man falling. We don\'t understand '
                    'yet. We are not meant to. The image is there and then gone.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Àkàakà ìgbasà ló jẹ́ ará Òde Ìká —'),
        P('note',  '[SUBTITLE: The ones that spun the thread continuously in the '
                   'ìgbasà tree are the people of Òde Ìká —]'),
        SP(),
        P('action', 'Women at the base of a vast, ancient tree — the ìgbasà. Their '
                    'hands spinning thread without stopping, without looking at their '
                    'hands. Thread that goes upward into the tree\'s canopy and '
                    'disappears. They have been doing this longer than anyone living '
                    'can remember.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Lọba ọba wọn, Oníkàámògún, ń\'tayò Oníkáà —'),
        P('note',  '[SUBTITLE: Their paramount king, Oníkàámògún, plays the '
                   'chambered-Ayo Game —]'),
        SP(),
        P('action', 'An Ayo game board — not the standard twelve-pit board. Sixteen '
                    'pots, arranged in two facing rows. Seeds moving. The board glows '
                    'faintly, as if it holds light inside each chamber. A hand moves '
                    'seeds. We cannot see the face above the hand.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Ọ̀ta ló máa jẹ Oníìká —'),
        P('note',  '[SUBTITLE: It is the winner who will be crowned as king of Ìká —]'),
        SP(),
        P('action', 'A figure receives something — not a crown. An understanding. '
                    'We cannot see his face either. Both the giver and receiver '
                    'remain unknown to us. For now.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí o mamaa jayé ọba ní káà —'),
        P('note',  '[SUBTITLE: Yet he is the one who will always thrive and reign '
                   'as king within the chamber —]'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Òde Ìká níbití wọn tí n\'ṣe aṣọ àká —'),
        P('note',  '[SUBTITLE: Òde Ìká, where they have long been weaving '
                   'the àká cloth —]'),
        SP(),
        P('action', 'The àká cloth being woven. The geometric patterns forming '
                    'under a weaver\'s hands — complex, layered, mathematical.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí èbìtì kakaka ń\'pa ìgbín kakaka —'),
        P('note',  '[SUBTITLE: Where the strong trap kills the strong snail —]'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Nítorì èbìtì tí ò gbójú kòle pàgbín kakaka —'),
        P('note',  '[SUBTITLE: Because a trap that is not strong cannot kill '
                   'the strong snail —]'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Nílú Òde Ìká tí wọn tí n\'ṣe aṣọ àká —'),
        P('note',  '[SUBTITLE: In the city of Òde Ìká, where they have long '
                   'been weaving the àká cloth.]'),
        SP(),
        P('action', 'We are inside Òde Ìká now. We have seen everything. '
                    'We understand nothing. Yet.'),
        P('action', 'The poem ends. The film begins.'),
        SP(),
    ]

    # ── SEQUENCE 2: THE MODERN FRAME ──────────────────────────────────────────
    s += [
        P('scene', 'INT. INSTITUTE OF IFA STUDIES, LECTURE HALL — DAY'),
        P('action', 'A space that is both a university lecture hall and a sacred '
                    'compound. Rows of Ifa scholars — Babalawo, Iyanifa, Onisese, '
                    'Olorisa — who are simultaneously professors, scientists, '
                    'engineers, architects. The walls hold Odu notation and molecular '
                    'diagrams in the same frame.'),
        P('action', 'At the front: ỌLÁBERINJỌ, 40s, lean and deliberate. He moves '
                    'like someone who has thought about every room he has walked '
                    'into. He is presenting, but "presenting" is not quite right — '
                    'he is wrestling, in public.'),
        P('action', 'Projected behind him: a diagram of fields of knowledge, all '
                    'separated, labeled, boxed. Mathematics. Physics. Medicine. '
                    'Literature. Music. Philosophy. Each in its own compartment. '
                    'No lines between them.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'We have built the most comprehensive knowledge infrastructure '
                   'in the history of this civilization. Every discipline represented. '
                   'Every school of thought accessible. We have, by every objective '
                   'measure, everything.'),
        P('paren', '(pause)'),
        P('dial',  'And still the students tell me they feel as if they have nothing. '
                   'The engineers cannot read nature. The artists cannot derive '
                   'principles. The mathematicians cannot hear the music in the '
                   'equations. They trade knowledge upon knowledge and call '
                   'themselves poor.'),
        SP(),
        P('action', 'He gestures to the diagram of separated fields.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ (CONT\'D)'),
        P('dial',  'We have organized knowledge into separate rooms and forgotten '
                   'that knowledge does not live in rooms. We pass through these '
                   'rooms without rooting in any of them. We are — '
                   'Ọlọ̀gbẹ́rì. The uninformed.'),
        SP(),
        P('action', 'A murmur in the hall. The word lands.'),
        P('action', 'At the center of the council of elders sits ÌYÁ AKÁỌGBỌ̀N — '
                    'ancient, precise, wearing the àká-woven cloth of her order. '
                    'She has heard everything he\'s said and found it '
                    'both correct and insufficient.'),
        SP(),
        P('char', 'ÌYÁ AKÁỌGBỌ̀N'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Ìwúre tó pé kì í padà òfo. A well-formed question always '
                   'finds its answer. You have asked the right question.'),
        P('note',  '[SUBTITLE: A prayer that is complete is never wasted. '
                   'A well-formed question always finds its answer. '
                   'You have asked the right question.]'),
        P('paren', '(beat)'),
        P('dial',  'Wá Oníkàámògún.'),
        P('note',  '[SUBTITLE: Find Oníkàámògún.]'),
        SP(),
        P('action', 'The hall goes quiet.'),
        P('action', 'Ọláberinjọ stands very still. He knows this name. He has '
                    'studied this name. He has never expected to hear it spoken '
                    'as a practical instruction.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(quietly)'),
        P('dial',  'Where?'),
        SP(),
        P('char', 'ÌYÁ AKÁỌGBỌ̀N'),
        P('dial',  'Bẹ̀rẹ̀.'),
        P('note',  '[SUBTITLE: Begin.]'),
        SP(),
        P('action', 'The diagram on the wall behind Ọláberinjọ — all those '
                    'separated fields — begins to blur. The compartments '
                    'lose their edges. The image dissolves.'),
        P('action', 'We go deep into the ancient layer.'),
        SP(),
        P('trans', 'DISSOLVE TO:'),
    ]

    # ── SEQUENCE 3: FIRST SIGHT OF ÒDÈ ÌKÁ ──────────────────────────────────
    s += [
        P('scene', 'EXT./INT. ÒDÈ ÌKÁ — DAY (MYTHIC-ANCIENT)'),
        P('action', 'Ọláberinjọ stands at the entrance to Òde Ìká — experiencing '
                    'this as a divination journey: he is simultaneously '
                    'observer and participant.'),
        P('action', 'The city is alive. Not the civilization-as-backdrop '
                    'of lesser epics — alive in the specific sense: weavers '
                    'at looms in open compounds, diviners casting in '
                    'courtyards while children watch, Ayo games being '
                    'played at every corner. Craftspeople who work with '
                    'the precision of scientists and the beauty of artists, '
                    'because in Òde Ìká these are the same thing.'),
        P('action', 'The city smells of àká cloth and fresh iyerosun powder '
                    'and akara frying somewhere nearby.'),
        P('action', 'The four DIVINER-WITNESSES materialize beside him — '
                    'present as elders who both narrate and inhabit this world.'),
        SP(),
        P('char', 'ẸLẸ́MỌ́NÍKÁ'),
        P('paren', '(to Ọláberinjọ)'),
        P('dial',  'Ẹ káàbọ̀ sí Òde Ìká.'),
        P('note',  '[SUBTITLE: Welcome to Òde Ìká.]'),
        SP(),
        P('char', 'ÀJÀNÀMỌKÁ'),
        P('dial',  'The city where everything has more than one name, '
                   'because everything here is more than one thing.'),
        SP(),
        P('action', 'In the market quarter: ALÁKÀRÀ stands with her tray of '
                    'akara — perfect, golden, fragrant. The market moves around '
                    'her in all directions. Nobody stops. Nobody buys. '
                    'She stands as if the market is happening in a different '
                    'world from the one she occupies.'),
        SP(),
        P('char', 'ALÁKÀRÀ'),
        P('paren', '(to no one, to everyone)'),
        P('dial',  'Wọn kò tún din àkàrà mọ̀ nibi.'),
        P('note',  '[SUBTITLE: They no longer fry akara here.]'),
        SP(),
        P('action', 'Ọláberinjọ watches her. He wants to say: '
                    'you are frying akara right now. But he understands '
                    'that this would not be the right response to '
                    'what he is witnessing.'),
        SP(),
        P('char', 'ARÁ Ọ̀FÀ'),
        P('paren', '(quietly, to Ọláberinjọ)'),
        P('dial',  'Her akara is perfect. The market is full. '
                   'She has everything she needs to trade. '
                   'This is the crisis.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'What is the crisis, if not shortage?'),
        SP(),
        P('char', 'ÒKÒKÒ'),
        P('paren', '(the quiet one; speaks only when necessary)'),
        P('dial',  'Perception. She cannot see what is already in her hands.'),
        SP(),
    ]

    # ── SEQUENCE 4: THE PARADOX ───────────────────────────────────────────────
    s += [
        P('scene', 'INT. ÒDÈ ÌKÁ, DIVINATION COURT — DAY'),
        P('action', 'The four diviner-witnesses and Ọláberinjọ, in the '
                    'city\'s central divination court. Open-roofed. '
                    'Iyerosun powder marks on the stone floor. '
                    'The sound of the city all around them.'),
        SP(),
        P('char', 'ẸLẸ́MỌ́NÍKÁ'),
        P('dial',  'Before you begin, there is one thing you must '
                   'hold. One sentence. If you forget it, the '
                   'journey will break you. If you carry it, '
                   'the journey will make you.'),
        SP(),
        P('action', 'He speaks deliberately, each word a placed weight.'),
        SP(),
        P('char', 'ẸLẸ́MỌ́NÍKÁ (CONT\'D)'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Oníkà nínú ni ò ṣe ìkà rí.'),
        P('note',  '[SUBTITLE: The one who holds Ìká within does not '
                   'practice cruelty.]'),
        SP(),
        P('action', 'The word hangs in the court.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'What is Ìká, if not cruelty?'),
        SP(),
        P('char', 'ÀJÀNÀMỌKÁ'),
        P('dial',  'That is the question the journey will answer.'),
        SP(),
        P('action', 'The invocations begin — not prayers. Calibrations.'),
        SP(),
        P('char', 'ALL FOUR DIVINERS'),
        P('paren', '(together)'),
        P('dial',  'Káwọ́mi —'),
        P('note',  '[SUBTITLE: Come to me —]'),
        SP(),
        P('action', 'The sound of the city seems to lean toward Ọláberinjọ.'),
        SP(),
        P('char', 'ALL FOUR DIVINERS (CONT\'D)'),
        P('dial',  'Kásẹ̀mi —'),
        P('note',  '[SUBTITLE: Let me receive —]'),
        SP(),
        P('action', 'Something opens in Ọláberinjọ. Not a mystical event — '
                    'a cognitive event. The quality of his attention changes. '
                    'He is being tuned to a frequency he has not yet '
                    'learned to hear.'),
        SP(),
    ]

    # ── SEQUENCE 5: THE MISSION ───────────────────────────────────────────────
    s += [
        P('scene', 'INT. ÒDÈ ÌKÁ, DIVINATION COURT — CONTINUOUS'),
        P('action', 'Órunmilà\'s PRESENCE — not a figure, but an authority '
                    'in the room. A weight. A direction.'),
        SP(),
        P('char', 'ÓRUNMILÀ (V.O.)'),
        P('paren', '(a voice that comes from the direction of the marks)'),
        P('dial',  'Ó ní abájọ tí ayé wọn fi rí kàmì kámi kàmì '
                   'bí ẹni tí ń\'káṣọ.'),
        P('note',  '[SUBTITLE: Your world moves back and forth — '
                   'kàmì kámi kàmì. Like a weaver counting cloth, '
                   'who never finishes the pattern.]'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(struck by this)'),
        P('dial',  'What do we do?'),
        SP(),
        P('char', 'ÓRUNMILÀ (V.O.)'),
        P('dial',  'Wá Oníkàámògún, ọmọ akáwórókó inú yẹmẹtu.'),
        P('note',  '[SUBTITLE: Find Oníkàámògún, child of the one '
                   'who weaves from within the earth\'s foundation.]'),
        SP(),
        P('char', 'ÀJÀNÀMỌKÁ'),
        P('paren', '(explaining the name to Ọláberinjọ)'),
        P('dial',  'Oní-ìkà-a-mò-gun. The possessor of Ìká\'s '
                   'power — who knows it — and does not deploy it '
                   'to destroy. Not a saint. A master. There is '
                   'a difference.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Where is he?'),
        SP(),
        P('char', 'ẸLẸ́MỌ́NÍKÁ'),
        P('dial',  'He has been seen in sixteen different places. '
                   'He is everywhere and nowhere. You must begin '
                   'at the first house and work through all '
                   'sixteen. He will not be in any of them. '
                   'But you will need every one of them before '
                   'you can reach him.'),
        SP(),
        P('action', 'Ọláberinjọ looks at the four diviner-witnesses. '
                    'He looks at the city around him — its weavers, '
                    'its diviners, its Ayo boards, its markets. '
                    'He takes a breath.'),
        P('action', 'He begins.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ═════════════════════════════════════════════════════════════════════════
    #  ACT TWO — ÌRIN-ÀJỌ̀ (THE JOURNEY)
    # ═════════════════════════════════════════════════════════════════════════
    s += [P('act', 'ACT TWO — ÌRIN-ÀJỌ̀\n(THE JOURNEY)')]

    # ── HOUSE 1: OGBE ─────────────────────────────────────────────────────────
    s += [
        P('scene', 'EXT./INT. HOUSE OF OGBE — DAWN'),
        P('action', 'The city announces itself as light. Everything here — '
                    'architecture, clothing, art — is white and luminous. '
                    'The Ogbe mark (eight parallel vertical lines) is carved '
                    'into every surface, casting clean shadows at every '
                    'angle of the sun. Ọláberinjọ enters. An elder BABALAWO '
                    'of Ogbe is waiting at the city\'s great eastern wall.'),
        SP(),
        P('char', 'OGBE BABALAWO'),
        P('paren', '(without turning around)'),
        P('dial',  'Stand here. Watch.'),
        SP(),
        P('action', 'Ọláberinjọ stands at the wall as sunrise begins. '
                    'As the sun rises, the Ogbe marks cast shadows. '
                    'The shadow patterns change precisely with the '
                    'angle of light. The elder has been recording '
                    'these patterns for forty years.'),
        SP(),
        P('char', 'OGBE BABALAWO (CONT\'D)'),
        P('dial',  'What do you see?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'A solar observatory.'),
        SP(),
        P('char', 'OGBE BABALAWO'),
        P('dial',  'And the mark itself? The eight lines?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(slowly)'),
        P('dial',  'A straight line is the path of light. '
                   'The mark... is the physics. The divination '
                   'mark and the optical law are the same object, '
                   'written in different languages.'),
        SP(),
        P('char', 'OGBE BABALAWO'),
        P('dial',  'Good. Now you may continue.'),
        P('paren', '(pause)'),
        P('dial',  'Oníkàámògún was here two months ago. He stood '
                   'at this wall from sunrise to sunset. He said '
                   'nothing when he left.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 2: OYEKU ────────────────────────────────────────────────────────
    s += [
        P('scene', 'INT. HOUSE OF OYEKU — NIGHT'),
        P('action', 'Underground architecture — not caves but inverted towers, '
                    'lit by bioluminescent plants. The city of endings, '
                    'where death is studied with precision. A HEALER '
                    'plays a dirge over a dying patient. The rhythm '
                    'is slow, measured, exact.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(watching the patient\'s condition changing in '
                   'response to the rhythm)'),
        P('dial',  'She\'s using the drum rhythm as a medical protocol.'),
        SP(),
        P('char', 'HEALER'),
        P('paren', '(still playing; doesn\'t look up)'),
        P('dial',  'The rhythm encodes the preparation interval '
                   'for the bark compound. Specific sequence — '
                   'specific biochemical timing. The music is '
                   'the prescription. Was Oníkàámògún here?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(surprised by the question)'),
        P('dial',  'I was going to ask you.'),
        SP(),
        P('char', 'HEALER'),
        P('dial',  'He was here when his teacher died. He sat '
                   'with the body for three days. He didn\'t '
                   'play music. He listened to the silence '
                   'between the rhythms. When he left, he said: '
                   '"The silence is also part of the notation."'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 3: IWORI ────────────────────────────────────────────────────────
    s += [
        P('scene', 'INT. HOUSE OF IWORI, INNER COURTYARD — DAY'),
        P('action', 'A city of wells and mirrors — architecture that '
                    'spirals inward. An IWORI SCHOLAR shows Ọláberinjọ '
                    'a vast divination cloth stretched across an entire '
                    'wall. It is a map — of consciousness itself. '
                    'Territories, roads, markets, weather patterns.'),
        SP(),
        P('char', 'IWORI SCHOLAR'),
        P('dial',  'The Ifa divination system does not only predict '
                   'the external world. It also maps the mind of '
                   'the one who seeks. The 256 Odu are 256 '
                   'fundamental states of consciousness and '
                   'their interactions.'),
        P('paren', '(pointing to a specific region of the map)'),
        P('dial',  'This is the Ọ̀gbẹ̀rì condition. Look — '
                   'here it is, precisely mapped. "The state '
                   'of passing through without receiving — '
                   'movement without contact."'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(staring at the map)'),
        P('dial',  'You\'re describing the crisis I came '
                   'to solve. It\'s already here. In the map.'),
        SP(),
        P('char', 'IWORI SCHOLAR'),
        P('dial',  'The Odu described it before you arrived. '
                   'The map was waiting for the mapmaker '
                   'to recognize himself in it.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 4: ODI ──────────────────────────────────────────────────────────
    s += [
        P('scene', 'INT. HOUSE OF ODI, SCULPTOR\'S COMPOUND — DAY'),
        P('action', 'The city that goes downward — built into hillsides, '
                    'root systems exposed everywhere in the architecture. '
                    'A SCULPTOR finishing a piece: the exact interior '
                    'of a seed\'s germination, rendered with the precision '
                    'of a modern biologist. Impossible precision '
                    'for the tools available. Yet here it is.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'How do you know what this looks like? '
                   'No eye can see inside a germinating seed.'),
        SP(),
        P('char', 'SCULPTOR'),
        P('paren', '(not looking up from her work)'),
        P('dial',  'Èmi ò kìí ń\'gbẹ́ ohun tí mo ń\'wò. '
                   'Ohun tí ó ń\'ṣẹlẹ̀ ni mo ń\'gbẹ́'),
        P('note',  '[SUBTITLE: I don\'t carve what I see. '
                   'I carve what is happening.]'),
        SP(),
        P('action', 'Ọláberinjọ stands with this sentence for '
                    'a long time. He will carry it through '
                    'every remaining house.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 5: IROSUN ───────────────────────────────────────────────────────
    s += [
        P('scene', 'INT. HOUSE OF IROSUN, LINEAGE ARCHIVE — DAY'),
        P('action', 'Everything here faintly red — the Irosun powder '
                    'stains everything. A LINEAGE KEEPER unrolls '
                    'a vast map that covers an entire compound wall. '
                    'Nodes connected by threads — a genealogy.'),
        P('action', 'She overlays a second map. A third. A fourth. '
                    'River system. Trade routes. The spread of a '
                    'medicinal plant. All four maps are structurally '
                    'identical.'),
        SP(),
        P('char', 'LINEAGE KEEPER'),
        P('dial',  'There is only one river. It runs through '
                   'everything. We call it Ọ̀ṣun when it carries '
                   'water. We call it blood when it carries life. '
                   'We call it lineage when it carries memory. '
                   'We call it trade when it carries goods. '
                   'The name changes. The mathematics does not.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(tracing Oníkàámògún on the lineage map)'),
        P('dial',  'He is here.'),
        SP(),
        P('char', 'LINEAGE KEEPER'),
        P('dial',  'He traced his line back seventeen generations. '
                   'He stayed three days. When he left he said: '
                   '"The red thread was never just family. '
                   'It was always the proof."'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 6: OWONRIN / ÌLÚ-ÌLÙ ───────────────────────────────────────────
    s += [
        P('scene', 'EXT./INT. HOUSE OF OWONRIN, ÌLÚ-ÌLÙ — NIGHT (RAINING)'),
        P('action', 'The house of wind and electricity — nothing stays '
                    'still here. Within Owonrin\'s kingdom: ÌLÚ-ÌLÙ, '
                    'the City of Drum. The inhabitants speak entirely '
                    'in Èdè Ìlú — Drum Language. No spoken words. '
                    'Everything is beat, rhythm, tone, tempo.'),
        P('action', 'A MASTER DRUMMER performs in the rain. '
                    'His performance is a response to the storm — '
                    'as the storm intensifies, the rhythm shifts; '
                    'as it relents, the rhythm relents. The drummer '
                    'and the storm are in conversation.'),
        P('action', 'After — the master shows Ọláberinjọ '
                    'the notation of the performance: '
                    'a system of drum-marks on palm leaf.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(studying the notation)'),
        P('dial',  'This is a weather record. You recorded '
                   'the storm as you played it. But you played '
                   'it during the storm. You were predicting '
                   'what it would do.'),
        SP(),
        P('char', 'MASTER DRUMMER'),
        P('paren', '(in drum-language — the subtitles appear '
                   'in the rhythm of his speech)'),
        P('dial',  'We learned from the storm. The storm '
                   'taught us the notation. Now when a storm '
                   'begins, we play its opening phrase — '
                   'and the storm completes it.'),
        P('paren', '(picks up the drum again; plays a sequence)'),
        P('dial',  'Pi. To sixty-four positions.'),
        P('paren', '(another sequence)'),
        P('dial',  'The orbital calculation of our brightest star.'),
        P('paren', '(a third)'),
        P('dial',  'The molecular structure of the àgbasà bark.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Who taught you this?'),
        SP(),
        P('char', 'MASTER DRUMMER'),
        P('dial',  'The drum did. We taught the drum first. '
                   'Then the drum taught us back. '
                   'That is Owonrin. You give and it '
                   'returns — transformed.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 7: OBARA ────────────────────────────────────────────────────────
    s += [
        P('scene', 'EXT. HOUSE OF OBARA, PALACE COMPOUND — DAY'),
        P('action', 'Grand, warm, generous. Fire at the palace center '
                    'radiates through channels in the city\'s roads, '
                    'warming every compound. The city layout, seen '
                    'from above, is the Obara Odu mark.'),
        SP(),
        P('char', 'OBARA KING'),
        P('dial',  'The way fire distributes heat and the way '
                   'royal authority should distribute resources '
                   'follow the same mathematics. We did not '
                   'derive the governance from the physics. '
                   'We developed them together, each correcting '
                   'the other. They are the same document.'),
        P('paren', '(beat)'),
        P('dial',  'Every city in this region was built from '
                   'an Odu mark. The Odu is the blueprint. '
                   'All sixteen cities are sixteen experiments '
                   'in the same question.'),
        SP(),
        P('action', 'Ọláberinjọ looks at the city\'s layout with '
                    'new eyes. Sixteen experiments. He is '
                    'living inside the experiment.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 8: OKANRAN — LÁKÁA'S DEATH ─────────────────────────────────────
    s += [
        P('scene', 'INT. HOUSE OF OKANRAN, SMITH\'S COMPOUND — DAY'),
        P('action', 'A city of precision and decision — narrow, vertical '
                    'architecture. The sound of hammers on iron from '
                    'every direction. A BLACKSMITH shows Ọláberinjọ '
                    'two finished blades — identical in appearance.'),
        SP(),
        P('char', 'BLACKSMITH'),
        P('dial',  'One will shatter at maximum impact. '
                   'One will hold. Tell me which is which.'),
        SP(),
        P('action', 'Ọláberinjọ examines them. He cannot tell. '
                    'She turns the blades flat-side toward him. '
                    'Now he can see: each has a different surface '
                    'pattern hammered into it. Concentric arcs '
                    'on one. A branching geometry on the other.'),
        SP(),
        P('char', 'BLACKSMITH (CONT\'D)'),
        P('dial',  'The concentric arc disperses force — '
                   'this blade holds steady under pressure. '
                   'The branching geometry concentrates force '
                   'at the tip — maximum impact, decisive cut, '
                   'shatters under lateral pressure.'),
        P('paren', '(directly)'),
        P('dial',  'The aesthetic of the pattern is the physics. '
                   'You can read the blade the way you read '
                   'the Odu — the mark tells you what will happen.'),
        SP(),
        P('action', 'Ọláberinjọ turns the branching blade in his '
                    'hands. He recognizes the pattern: it is a '
                    'variant of the Ogbe mark, spreading into space. '
                    'He has seen this before. The first house. '
                    'The same geometry, a different substrate.'),
        SP(),
    ]

    s += [
        P('scene', 'EXT. HOUSE OF OKANRAN, ÀKÁ (STORAGE BARN) — DAY'),
        P('action', 'Ọláberinjọ walking toward the àká — the indigenous '
                    'storage barn at the city\'s edge — where Oníkàámògún was '
                    'last seen, a week ago.'),
        P('action', 'He hears the commotion before he sees it. '
                    'He pushes through a gathering crowd.'),
        P('action', 'LÁKÁA is on the ground. Young. Named for '
                    'Okanran\'s sharpness. He had been sent to '
                    'fetch stored timber from the àká — '
                    'seasoned wood held there for the smithing fires.'),
        P('action', 'The donkey ÌBAKÀ stands a few feet away. '
                    'Still. One foreleg slightly raised. '
                    'The animal does not understand what it has done.'),
        P('action', 'What happened: Lákáa reached the àká. '
                    'Ìbakà startled — for no apparent reason; '
                    'the air shifted, or a bird landed, or nothing '
                    'at all. The animal\'s body turned. '
                    'Its shoulder connected with Lákáa\'s shoulder '
                    'at the moment both were in motion toward each other. '
                    'The geometry was wrong. The angle was wrong. '
                    'Okanran does not negotiate angles.'),
        P('action', 'Lákáa fell. He did not rise.'),
        P('action', 'The COBRA — Ọká — which has lived at the '
                    'base of this àká for as long as anyone '
                    'remembers — drawn here, as cobras are, '
                    'by the rodents that follow stored grain — '
                    'is coiled now at the barn\'s foundation post. '
                    'Motionless. Watching. As Ọláberinjọ watches, '
                    'the cobra makes a sound — not a hiss, '
                    'something lower and longer — that he has '
                    'never heard from any animal.'),
        P('action', 'The grief of Okanran is clean, precise, '
                    'without false comfort. No one wails. '
                    'Several people weep without sound.'),
        SP(),
        P('action', 'Ọláberinjọ finds an ELDER standing apart '
                    'from the crowd.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(shaken)'),
        P('dial',  'Was this necessary?'),
        SP(),
        P('char', 'OKANRAN ELDER'),
        P('dial',  'The àká had to be reached. The wood '
                   'had to come. Lákáa carried both '
                   'the task and its cost. That is Okanran — '
                   'the moment of decisive contact does '
                   'not arrive because we are ready. '
                   'It arrives because it is time.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'That isn\'t an answer.'),
        SP(),
        P('char', 'OKANRAN ELDER'),
        P('dial',  'No. It is the truth. Which is different '
                   'from an answer. An answer would make '
                   'it comprehensible.'),
        P('paren', '(pause)'),
        P('dial',  'Oníkàámògún stood where you are standing, '
                   'the last time someone died at this àká. '
                   'He stood for a long time. When he left, '
                   'he went to the surgeon\'s compound and '
                   'watched them work for three days. '
                   'He didn\'t say why.'),
        SP(),
        P('action', 'Ọláberinjọ looks at the àká — the barn wall, '
                    'the foundation, the stored wood still inside. '
                    'The cobra is still watching.'),
        P('action', 'He walks through the city gate. '
                    'He does not speak for the rest of the day.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSES 9-10 (OGUNDA, OSA) — QUICK SEQUENCES ──────────────────────────
    s += [
        P('scene', 'EXT. HOUSE OF OGUNDA, FOREST ROAD — DAY'),
        P('action', 'Iron and forest in symbiosis. A ROAD-BUILDER '
                    'laying a new road that curves three times '
                    'against what geometry suggests. Ọláberinjọ '
                    'asks why.'),
        SP(),
        P('char', 'ROAD-BUILDER'),
        P('dial',  'Look at the root patterns. These trees '
                   'still know where the ancient river ran — '
                   'dried two hundred years ago. Their roots '
                   'still follow it. We follow the river. '
                   'The water knows the land better than we do. '
                   'Engineering from biological memory.'),
        SP(),
        P('action', 'Above the gate at the road\'s end: '
                    'carved in Ogunda\'s mark — '
                    '"Ilẹ̀ ń\'gbádùn ẹni tó wọ̀ inú rẹ̀." '
                    'The land delights in the one who enters '
                    'into it. Oníkàámògún left these words here.'),
        SP(),
        P('trans', 'CUT TO:'),
        SP(),
        P('scene', 'INT. HOUSE OF OSA, PAINTER\'S STUDIO — DAY'),
        P('action', 'A city of reversals. An ARTIST shows Ọláberinjọ '
                    'a series of abstract paintings — intensely '
                    'geometric, high contrast. She flips a panel. '
                    'The other side: a precise phase diagram, '
                    'the scientific map of a geological transition.'),
        SP(),
        P('char', 'OSA ARTIST'),
        P('dial',  'You see the earth move. I see the equation. '
                   'Art can hold the moment between states '
                   'longer than science can — because science '
                   'must choose one side or the other. '
                   'Painting exists in the in-between.'),
        P('paren', '(showing the oldest painting)'),
        P('dial',  'Three hundred years old. It depicts the moment '
                   'a river reversed course. The geological record '
                   'confirmed it sixty years ago. The painter '
                   'studied that river every day for forty years. '
                   'The painting came from that study.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 11: ÌKÁ — THE AYO BOARD + THE MESSAGE ───────────────────────────
    s += [
        P('scene', 'EXT./INT. HOUSE OF ÌKÁ — DAY'),
        P('action', 'He knows it before he arrives. A different quality '
                    'of light — and the smell of àká cloth in sufficient '
                    'quantities to change the atmosphere. Every surface '
                    'covered: woven panels on walls, àká cloth as '
                    'roof overhangs, àká cloth folded and stacked in '
                    'every compound. The marks woven into the cloth '
                    'are the Odu marks of all sixteen. He reads them '
                    'as he walks through, like a library.'),
        SP(),
        P('scene', 'INT. HOUSE OF ÌKÁ, IFA ART COMPOUND — CONTINUOUS'),
        P('action', 'An entire quarter devoted to Ifa Arts and Orisa '
                    'Arts production — not a museum. A working space. '
                    'Cloth weavers, Ifa mark-carvers, Orisa image-makers, '
                    'bead-stringers, Ifa board makers, calabash engravers.'),
        P('action', 'Each artist is simultaneously something else. '
                    'The cloth weaver has mathematical notations pinned '
                    'to her loom-post, checked against the pattern '
                    'as she works. The Orisa image-maker produces '
                    'a metallurgical record in the image\'s surface '
                    'pattern. The bead-stringer\'s color sequences '
                    'encode medicinal plant combinations.'),
        P('action', 'A calabash engraver working on a large piece — '
                    'the engraving dense and intricate. Ọláberinjọ '
                    'studies it. It takes several minutes to recognize: '
                    'it is the map of the sixteen houses. Precisely. '
                    'All sixteen kingdoms, their spatial relationships, '
                    'the roads between them, the 17th marked at '
                    'the convergence point.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Who commissioned this map?'),
        SP(),
        P('char', 'CALABASH ENGRAVER'),
        P('paren', '(not looking up)'),
        P('dial',  'Oníkàámògún. He described every house '
                   'from memory. Sat here four days. '
                   'Corrected me three times.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'When?'),
        SP(),
        P('char', 'CALABASH ENGRAVER'),
        P('dial',  'Three days ago.'),
        SP(),
        P('action', 'Three days. Ọláberinjọ is almost running.'),
        SP(),
    ]

    s += [
        P('scene', 'INT. HOUSE OF ÌKÁ, CENTRAL COURTYARD — CONTINUOUS'),
        P('action', 'Two Ayo games in adjacent compounds — one standard '
                    'twelve-pit board, one something Ọláberinjọ has '
                    'not seen before.'),
        P('action', 'SIXTEEN POTS. Two rows of eight, facing each other. '
                    'The pots are deeper than standard — each one a '
                    'distinct chamber, carved separately and assembled. '
                    'The seeds: 256 total, starting distribution '
                    'not symmetrical. A central channel between '
                    'the rows. Narrow. Currently empty.'),
        P('action', 'The two men playing this board are slow. '
                    'Deliberate. They study the full board before '
                    'each move. No rapid-fire speed. This looks, '
                    'to Ọláberinjọ, like a different activity '
                    'from Ayo.'),
        P('action', 'An ELDER watching speaks to him without '
                    'being asked.'),
        SP(),
        P('char', 'ELDER OF ÌKÁ'),
        P('dial',  'Regular Ayo teaches you survival. '
                   'How seeds move. How one force outlasts another. '
                   'It is a complete teaching — do not dismiss it. '
                   'It has been teaching for a thousand years.'),
        P('paren', '(gesturing to the 16-pot board)'),
        P('dial',  'Ayò Ọlọ́pọ́nfá is a different question. '
                   'Each of the sixteen pots is a domain of knowledge. '
                   'The seeds are insights. When you move a seed '
                   'from one pot to another, you model the transfer '
                   'of understanding from one field to another. '
                   'The question is not who captures the most — '
                   'the question is whether you understand how '
                   'all sixteen fields interact simultaneously. '
                   'Whether you can read the whole board at once.'),
        P('paren', '(beat)'),
        P('dial',  'The central channel receives only when the board '
                   'achieves a state of integration. You cannot '
                   'force seeds into it. Watch.'),
        SP(),
        P('action', 'As the two players simultaneously reach a '
                    'particular configuration — a seed appears '
                    'in the central channel, as if drawn there.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(watching the seed in the channel)'),
        P('dial',  'This is not a game. This is a meta-model machine.'),
        SP(),
        P('char', 'ELDER OF ÌKÁ'),
        P('dial',  'The Ifa Computer. Yes.'),
        SP(),
        P('action', 'Ọláberinjọ is late leaving this house.'),
        SP(),
    ]

    s += [
        P('scene', 'EXT. HOUSE OF ÌKÁ, CITY GATE — LATE AFTERNOON'),
        P('action', 'A CLOTH WEAVER intercepts him as he reaches '
                    'the gate. She stops directly in front of him.'),
        SP(),
        P('char', 'ÌKÁ WEAVER'),
        P('dial',  'You are looking for Oníkàámògún.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Yes.'),
        SP(),
        P('char', 'ÌKÁ WEAVER'),
        P('dial',  'He was here three days ago. He asked about you. '
                   'He described you — knew your name, your lineage, '
                   'your work. He said: he will come through here. '
                   'Tell him this.'),
        P('paren', '(reciting carefully, exactly)'),
        P('dial',  '"The weave is the answer. Tell him the weave '
                   'is the answer. He will know when he sees '
                   'the whole cloth, not just the threads."'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(quietly)'),
        P('dial',  'He knew I was coming.'),
        SP(),
        P('char', 'ÌKÁ WEAVER'),
        P('dial',  'He said the quest works in both directions. '
                   'You are searching for him. He has been '
                   'watching you arrive.'),
        P('paren', '(pause)'),
        P('dial',  'He also said: do not hurry the last five houses. '
                   'The hurrying was the problem before.'),
        SP(),
        P('action', '"Before." Ọláberinjọ stands at the gate for '
                    'a long time. Then he continues. Slowly.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSES 12-14 (OTURUPON, OTURA, IRETE) — SEQUENCES ───────────────────
    s += [
        P('scene', 'INT. HOUSE OF OTURUPON, RECOVERY ARCHIVE — DAY'),
        P('action', 'A city excavating itself — old foundations visible, '
                    'studied, preserved. A SCHOLAR OF RECOVERY shows '
                    'Ọláberinjọ a text recovered from two centuries of '
                    'misreading: what was dismissed as mythology about '
                    'a king who ate too much salt is, under Oturupon\'s '
                    'analysis, a precise clinical case study of a '
                    'sodium imbalance disorder — diagnosis, treatment, '
                    'outcome, follow-up.'),
        SP(),
        P('char', 'SCHOLAR OF RECOVERY'),
        P('dial',  'It was always a medical case study. '
                   'It was misclassified as myth by people '
                   'who could not read both registers simultaneously. '
                   'The arts and the sciences were always the same '
                   'document. The separation was imposed from outside.'),
        P('paren', '(gesturing to a room of recovered texts)'),
        P('dial',  'More than we can count. We have been '
                   'recovering for six generations and we are '
                   'still in the first layer.'),
        SP(),
        P('trans', 'CUT TO:'),
        SP(),
        P('scene', 'EXT. HOUSE OF OTURA, SKY OBSERVATORY — NIGHT'),
        P('action', 'High-built, open-roofed architecture facing always '
                    'upward. A SKY-WATCHER shows Ọláberinjọ a divination '
                    'tray oriented toward the night sky — the Iyerosun '
                    'marks in exact correspondence with the star positions.'),
        SP(),
        P('char', 'SKY-WATCHER'),
        P('dial',  'The Odu Marks came down from the sky, ọ̀run. '
                   'Babalawo reads the Odu based on this understanding. '
                   'The marks came down. '
                   'Ọrun is the source — the Odu are the projections.'),
        P('paren', '(showing Ọláberinjọ the recorded visit)'),
        P('dial',  'Oníkàámògún came when the sky showed his '
                   'own Odu. An Ìká configuration. Oníìká came when '
                   'the sky called his name.'),
        SP(),
        P('trans', 'CUT TO:'),
        SP(),
        P('scene', 'EXT. HOUSE OF IRETE, ANCIENT TREE — DAY'),
        P('action', 'The oldest city in the journey. Ancient trees '
                    'wider than buildings. An ELDER takes Ọláberinjọ '
                    'to a rock formation at the city\'s edge — '
                    'the pattern of the rocks is the Irete Odu mark. '
                    'Not carved by human hands. Formed by geology '
                    'over thousands of years.'),
        SP(),
        P('char', 'IRETE ELDER'),
        P('dial',  'This formation was here before humanity. '
                   'Our ancestors found it, studied it — '
                   'the Irete mark came from this rock. '
                   'The Odu mark is the result of the deepest '
                   'possible attention to a natural process.'),
        P('paren', '(at the 800-year tree)'),
        P('dial',  'Oníkàámògún sat with this tree for a week. '
                   'When he left, he said: "The tree already knows '
                   'everything. We are here to learn the speed '
                   'at which it speaks."'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 15: OSE — THE CRISIS ────────────────────────────────────────────
    s += [
        P('scene', 'EXT. HOUSE OF OSE, RIVERBANK — NIGHT'),
        P('action', 'The most beautiful city of the journey — '
                    'deliberate beauty everywhere. Its markets overflow. '
                    'Its buildings are beautiful in ways that make the '
                    'city cooler, direct water efficiently, create shade '
                    'exactly where people gather. Aesthetic choices '
                    'that are also engineering choices, inseparable.'),
        P('action', 'But Ọláberinjọ is not seeing the beauty tonight. '
                    'He sits at the river\'s edge as the sun goes down. '
                    'He has been through fourteen houses.'),
        P('action', 'He lays out his divination chain — the opele — '
                    'on the earth beside him. He has not cast for '
                    'himself since the journey began.'),
        P('action', 'He casts.'),
        P('action', 'The Odu: Ose.'),
        P('action', 'He almost laughs. He is in Ose\'s house and '
                    'the Odu gives him Ose. The Odu knows '
                    'where it is. Or: the Odu always gives you '
                    'what you are standing in the middle of.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(to himself, the ese verse surfacing '
                   'from memory)'),
        P('dial',  'Ìgbín kakaka. Èbìtì kakaka. '
                   'Èbìtì tí ò bá gbójú; kòle pàgbín kakaka.'),
        P('note',  '[SUBTITLE: The strong snail. The strong trap. '
                   'A trap that is not strong cannot kill '
                   'a strong snail.]'),
        SP(),
        P('action', 'He sits with this. The river moves.'),
        P('action', 'He has been through fourteen houses. He has '
                    'more knowledge than he has ever held. And he '
                    'has been a weak trap: moving toward knowledge '
                    'rather than becoming it. Studying the quest '
                    'rather than living inside it. The Ọlọ̀gbẹ́rì '
                    'condition — he has been inside it '
                    'this entire time.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ (CONT\'D)'),
        P('paren', '(seeing it clearly for the first time)'),
        P('dial',  'I am Alákàrà. I have been standing in '
                   'the market with perfect akara, surrounded '
                   'by everything I need, and calling myself poor.'),
        SP(),
        P('action', 'He stays at the river\'s edge all night. '
                    'He does not sleep. He does not cast again. '
                    'He sits with the Odu Ose open and does nothing '
                    'except be present in the house of abundance, '
                    'by the river that connects everything.'),
        P('action', 'At some point, deep in the night, he understands '
                    'something about Lákáa.'),
        P('action', 'Lákáa was not a cost the quest extracted. '
                    'Lákáa\'s death is inside Ọláberinjọ now, '
                    'carried through every house since Eight. '
                    'It is the weight that makes his steps heavier. '
                    'It is also the thing that prevents him from '
                    'rushing. Because of Lákáa, he cannot be '
                    'entirely academic about this journey. '
                    'Because of Lákáa, he knows the quest is real.'),
        P('action', 'In the morning: he rises. He is not the same '
                    'person who sat down.'),
        P('action', 'Before leaving, he goes to the market. '
                    'He finds a seller standing with something perfect '
                    'in a busy market, with no buyers. He buys. '
                    'She is surprised — overly grateful. He is the '
                    'first buyer she has had today.'),
        P('action', 'He walks toward the sixteenth house eating '
                    'what he bought, and does not look back.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── HOUSE 16: OFUN — THE THRESHOLD ────────────────────────────────────────
    s += [
        P('scene', 'EXT./INT. HOUSE OF OFUN — DAY'),
        P('action', 'The quietest city of the journey — not smaller, '
                    'but different in quality. Everywhere: things being '
                    'completed. A cloth weaver tying off the last threads '
                    'of a vast panel she has worked on for years. '
                    'A builder laying the last stone of a new building '
                    'with enormous care. In the debate court, '
                    'a long case closing — both advocates making '
                    'final statements in the respectful tones of '
                    'people who have argued well and are ready to be done.'),
        P('action', 'Completion here is the most active state.'),
        SP(),
        P('char', 'OFUN KING'),
        P('paren', '(without preamble)'),
        P('dial',  'You have been through fifteen houses. '
                   'Each gave you something specific. Something '
                   'that could not come from any other house. '
                   'What remains — the thing all fifteen '
                   'could not give you — what is it?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(considering this carefully; does not answer quickly)'),
        P('dial',  'The integration. I have fifteen knowledges '
                   'I understand separately. I have begun to see '
                   'the connections between them. But I have not '
                   'yet seen them as one thing. I have seen '
                   'the threads. I have not seen the whole cloth.'),
        SP(),
        P('char', 'OFUN KING'),
        P('dial',  'That is what Ofun is. The cloth becoming visible '
                   'because the weaving is complete. The pattern '
                   'only emerges at completion — not before. '
                   'The weaver knows this. She does not stop every '
                   'few rows to ask whether the design is correct. '
                   'She completes. Then she looks.'),
        P('paren', '(beat)'),
        P('dial',  'The seventeenth is not another house after '
                   'the sixteen. The seventeenth is what the '
                   'sixteenth produces when it finishes. '
                   'Ofun does not point toward it — Ofun '
                   'becomes it when it completes.'),
        SP(),
        P('scene', 'EXT. HOUSE OF OFUN, CITY BOUNDARY — CONTINUOUS'),
        P('action', 'The king walks Ọláberinjọ to the city\'s edge. '
                    'Ahead: not another city. A convergence point — '
                    'a place where you can feel that all sixteen '
                    'roads lead here, even though he came from '
                    'only one direction.'),
        SP(),
        P('char', 'OFUN KING'),
        P('dial',  'He is there. I cannot point more precisely '
                   'because "there" is not a location. '
                   'It is a convergence. All sixteen roads '
                   'arrive there simultaneously. You came '
                   'from one direction — but when you arrive, '
                   'you will feel the other fifteen roads '
                   'arriving with you.'),
        P('paren', '(looking at Ọláberinjọ directly)'),
        P('dial',  'Most people find something in one of '
                   'the sixteen houses that satisfies them '
                   'and stop there. That is not wrong — '
                   'the sixteen houses are complete in '
                   'themselves. But those who must reach '
                   'the seventeenth cannot stop. You felt '
                   'the incompleteness in every house. '
                   'Did you not?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Yes.'),
        SP(),
        P('char', 'OFUN KING'),
        P('dial',  'Then you were always going to arrive. '
                   'The only question was what you would be '
                   'when you got there.'),
        SP(),
        P('action', 'The king goes back into his city to watch '
                    'things complete. Ọláberinjọ looks at the '
                    'road ahead. He walks forward.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ═════════════════════════════════════════════════════════════════════════
    #  ACT THREE — MÉJÌ (THE 17TH HOUSE)
    # ═════════════════════════════════════════════════════════════════════════
    s += [P('act', 'ACT THREE — MÉJÌ\n(THE 17TH HOUSE)')]

    # ── SEQUENCE 17: THE DISCOVERY ────────────────────────────────────────────
    s += [
        P('scene', 'EXT. THE CONVERGENCE ROAD — DAY'),
        P('action', 'The road from Ofun does not feel like the '
                    'previous roads. The landscape is not different — '
                    'same terrain, same vegetation — but the quality '
                    'of attention it demands is different. He is not '
                    'searching. He is walking toward something that '
                    'is walking toward him.'),
        P('action', 'At a certain point he stops thinking about '
                    'where he is going. His feet continue.'),
        P('action', 'He arrives.'),
        SP(),
        P('scene', 'EXT./INT. THE 17TH COMPOUND — DAY'),
        P('action', 'Not a building. A convergence of paths — '
                    'sixteen roads meeting at a point, but the '
                    'meeting is not a crossroads. It is a center '
                    'of gravity. Each road does not end here; '
                    'it turns inward here, spiraling gently '
                    'into a clearing.'),
        P('action', 'At the center of the clearing: a compound. '
                    'Simple, clean, without decoration — all the '
                    'decoration has been earned by the journey '
                    'to reach it. The compound does not need ornament. '
                    'It is already everything.'),
        SP(),
        P('scene', 'INT. THE 17TH COMPOUND, INNER COURTYARD — CONTINUOUS'),
        P('action', 'And here:'),
        P('action', 'ONÍKÀÁMÒGÚN.'),
        P('action', 'He is exactly as the Opening Poem described. '
                    'Exactly. We recognize him image by image.'),
        P('action', 'The àká cloth covers him from shoulder to ankle. '
                    'Worn — not ragged, but worked. Lived in. '
                    'This is not a ceremonial garment. It is his skin.'),
        P('action', 'The cobra\'s head is in his right hand — dry, '
                    'precise — tracing marks in the Iyerosun powder '
                    'on the divination tray. The marks are unlike '
                    'any Ọláberinjọ has seen: clean and exact, '
                    'as if drawn with a fine instrument.'),
        P('action', 'Two small Egun masquerades — PÀRÀKÁ MÉJÌ — '
                    'stand to his left, motionless and masked. '
                    'They are silent when Ọláberinjọ enters. '
                    'One turns its masked face toward the door. '
                    'The other does not.'),
        P('action', 'His left hand rests on a vessel of akika. '
                    'His head bears the faint marks of it: '
                    'he has been applying it steadily, over time. '
                    'This is not a ceremony. It is an ongoing practice.'),
        P('action', 'He looks up when Ọláberinjọ enters.'),
        P('action', 'He shows no surprise. There is no version of '
                    'this moment in which he would show surprise.'),
        P('action', 'The first pàràká speaks. Short. Clipped. '
                    'The compressed authority of the ancestral voice:'),
        SP(),
        P('char', 'PÀRÀKÁ KINNÍ'),
        P('paren', '(the speech of Egungun — terse, final)'),
        P('dial',  'Ẹnu awo.'),
        SP(),
        P('action', 'Oníkàámògún does not look at the pàràká. '
                    'He looks at Ọláberinjọ.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Ẹnu awo ni ìbà òun àṣẹ wa'),
        P('note',  '[SUBTITLE: The mouth of the diviner is where '
                   'reverence originates. The mouth of the diviner '
                   'is where command originates.]'),
        SP(),
        P('action', 'Not a greeting. An orientation. '
                    'He is telling Ọláberinjọ what kind of scene '
                    'this is: a divination. Everything that follows '
                    'is a divination.'),
        SP(),
    ]

    # ── SEQUENCE 18: THE TEACHING ─────────────────────────────────────────────
    s += [
        P('scene', 'INT. THE 17TH COMPOUND, INNER CHAMBER — CONTINUOUS'),
        P('action', 'Oníkàámògún clears the divination tray and begins '
                    'to cast for Ọláberinjọ — using the cobra\'s head '
                    'to draw marks directly rather than casting '
                    'palm nuts. Each mark pulled from the powder '
                    'with precise, unhurried strokes.'),
        P('action', 'The marks that emerge: Ìká Méjì. '
                    'The doubled Ìká configuration.'),
        P('action', 'He looks at the marks for a long time. Then:'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'You came with a question. '
                   'Not your question — a civilization\'s question. '
                   'How do we use the arts to study the sciences? '
                   'How do we use the sciences to study the arts?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Yes.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'The Odu has already answered. It answered '
                   'before you were born. The answer is in the '
                   'reading itself — not in what I tell you, '
                   'but in what the marks are.'),
        P('paren', '(pointing to the Ìká Méjì configuration)'),
        P('dial',  'Look at these marks. What are they?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'The Ìká Méjì configuration. Binary notation. '
                   'Eight marks — four pairs. Each mark: '
                   'present or absent, open or closed. '
                   'One of the 256 possible Odu states.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'Where did the marks come from?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'From the cobra\'s head, drawn through the powder.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'Where did the tradition of using the cobra\'s head '
                   'come from?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(pause)'),
        P('dial',  'I don\'t know the exact origin.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'From the observation of cobra movement in dust. '
                   'The original Babalawo who first used this tool '
                   'was observing the snake\'s path through sand '
                   'and recognized in that path the beginning '
                   'of the mark system. Natural observation — '
                   'geometric observation — symbolic encoding — '
                   'mathematical system. All one gesture. '
                   'Art and science, inseparable from the first moment.'),
        P('paren', '(pointing to the marks)'),
        P('dial',  'These marks are simultaneously: '
                   'a poem — the Ìká Méjì ese is among the most '
                   'beautiful in the Odu corpus. '
                   'A binary code — the foundation of computation. '
                   'A medical protocol — specific prescriptions '
                   'for specific conditions. '
                   'An astronomical record — Ìká Méjì appears '
                   'at a specific celestial configuration '
                   'that repeats on a seventeen-year cycle. '
                   'A governance model. A game.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(quietly)'),
        P('dial',  'They were never separated.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'They were never separated. The Odu was always '
                   'all of these things simultaneously. '
                   'The separation is the poverty of perception. '
                   'And like all poverty of perception, '
                   'it is a cognitive state — not a material reality. '
                   'Alákàrà has the akara. The market is full. '
                   'The problem is not shortage.'),
        P('paren', '(beat)'),
        P('dial',  'The Babalawo who divines and the mathematician '
                   'who computes and the poet who sings and the '
                   'engineer who builds — in the beginning, '
                   'these were the same person. They can be again.'),
        SP(),
        P('action', 'The second pàràká speaks. '
                    'It says: Ìká. Then again: Ìká. '
                    'The third iteration has a different quality — '
                    'lower, settled, as if the word has found its place '
                    'in the earth. An Egungun says a word three times '
                    'until the word becomes a reality.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'The pàràká knows Ìká. Ká — to master. '
                   'To know a thing so completely that the thing '
                   'and the knower are no longer distinguishable. '
                   'The pàràká does this with its very body — '
                   'it becomes what it embodies. The masquerade '
                   'is not wearing the ancestor. It is the ancestor. '
                   'We are trying to do this with knowledge.'),
        P('paren', '(standing; moving to bring the board)'),
        P('dial',  'Understanding is not mastery. '
                   'Mastery is demonstrated. '
                   'Are you ready for the game?'),
        SP(),
    ]

    # ── SEQUENCE 19: THE AYO GAME ─────────────────────────────────────────────
    s += [
        P('scene', 'INT. THE 17TH COMPOUND, INNER CHAMBER — CONTINUOUS'),
        P('action', 'Oníkàámògún brings the Ayò Ọlọ́pọ́nfá board — '
                    'the 16-pot board, the Ifa Computer. He sets it '
                    'between them on a low table. In this space, '
                    'with this man, the board has a different weight '
                    'than when Ọláberinjọ saw it at House Eleven.'),
        P('action', 'The two pàràká shift their stance. '
                    'The masked faces turn toward the board. '
                    'They are paying attention.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'In regular Ayo: you take seeds from one pit, '
                   'distribute them into subsequent pits, capture '
                   'when you create specific configurations. '
                   'The goal is to end with the most seeds. '
                   'You play your side of the board.'),
        P('paren', '(touching the 16-pot board)'),
        P('dial',  'In Oníkáà — the chambered Ayo — the rule '
                   'is different in one way that changes everything. '
                   'You play the whole board. Either player can move '
                   'seeds from any pit — yours or your opponent\'s — '
                   'as long as you understand why you are moving them. '
                   'The constraint is not whose pit it is. '
                   'The constraint is whether the move serves '
                   'the board\'s integration.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'How do you win?'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'The winner is the one who, when the board '
                   'reaches its final state, holds the deepest '
                   'understanding of why every seed is '
                   'where it is. The board judges it. Watch.'),
        SP(),
        P('action', 'He distributes seeds for the starting position. '
                    'The distribution is specific, not symmetrical — '
                    'each pit begins with a quantity that corresponds '
                    'to the complexity of its Odu.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Begin.'),
        SP(),
        P('action', '--- THE GAME ---'),
        SP(),
        P('action', 'OPENING MOVES: Oníkàámògún takes seeds from the '
                    'pit corresponding to House One — Ogbe, first light — '
                    'and distributes them forward along the board. '
                    'Eight seeds, eight pots. From light toward contact.'),
        P('action', 'Ọláberinjọ responds: seeds from Ose — House Fifteen, '
                    'his crisis house — distributed forward, looping back '
                    'toward the beginning. From abundance back '
                    'toward first principles. A loop.'),
        SP(),
        P('action', 'MIDDLE GAME: They play in silence. The game '
                    'breathes differently from regular Ayo — '
                    'slower inhalation, held breath before each move, '
                    'slow exhalation as seeds move.'),
        P('action', 'Ọláberinjọ is playing analytically at first — '
                    'reading pot by pot, projecting forward, '
                    'calculating. This is how he played Ayo '
                    'before the journey. He is good at this.'),
        P('action', 'But the board resists pure analysis. When he '
                    'plays a move that serves only his row, the '
                    'board\'s pattern becomes less coherent — '
                    'he can feel it, the way a poorly argued '
                    'sentence makes a paragraph fall apart. '
                    'The board has a quality of rightness or '
                    'wrongness not reducible to count-advantage.'),
        SP(),
        P('action', 'THE CRISIS MOVE: Ọláberinjọ plays aggressively '
                    'from the Okanran pit — House Eight — '
                    'creating a position where he can capture '
                    'from three of Oníkàámògún\'s pots '
                    'on the next turn. Maximum capture. '
                    'Standard Ayo logic applied to Oníkáà.'),
        P('action', 'Oníkàámògún looks at the board. '
                    'He makes a single move — takes two seeds '
                    'from the central channel and distributes '
                    'them across four pots along the board\'s center.'),
        P('action', 'Ọláberinjọ\'s capture opportunity collapses. '
                    'And the board\'s overall pattern — all sixteen '
                    'pots — becomes more coherent. He can feel it. '
                    'It is better. But he is losing.'),
        SP(),
        P('action', 'THE STILLNESS: Ọláberinjọ stops. '
                    'He does not make a move. He puts his hands in his lap.'),
        P('action', 'He looks at the board the way he looked at '
                    'the river in House Fifteen, all night. '
                    'Not calculating. Looking.'),
        P('action', 'Sixteen pots. He has been inside each one. '
                    'The pits of Ìlú-Ìlù and Otura — '
                    'sound-science and sky-science — are '
                    'mathematically adjacent in the game\'s current state, '
                    'even though they are spatially separated on the board. '
                    'The drummer who encoded the orbital calculation. '
                    'He made this connection then but didn\'t carry it forward.'),
        P('action', 'He sees: the pits of Oturupon and Odi '
                    'feeding each other — archaeology of knowledge '
                    'and the science of hidden processes. '
                    'You cannot recover what was buried without '
                    'understanding what the burial process was.'),
        P('action', 'He sees the whole cloth.'),
        P('action', 'Not as a thought. As a perception. '
                    'The way you see a face — not by analyzing '
                    'the nose then the eyes then the mouth, '
                    'but all at once as a face.'),
        SP(),
        P('action', 'CLOSING MOVES: His first move from '
                    'this new perception — seeds from Ogunda, '
                    'the path-maker, distributed across '
                    'five non-adjacent pots: Ogbe, Irosun, '
                    'Okanran, Irete, Ofun. Five connections '
                    'at once. The path-maker feeds the first '
                    'principle, feeds the flow, feeds the '
                    'decisive moment, feeds deep time, '
                    'feeds completion. He can see these '
                    'five are always in conversation.'),
        P('action', 'A seed appears in the central channel. '
                    'Spontaneously. He did not direct it there. '
                    'The board put it there.'),
        P('action', 'Oníkàámògún\'s eyes move to the channel. '
                    'He makes a sound — not words, a sound '
                    'of recognition. He has seen this happen before. '
                    'Not many times.'),
        P('action', 'They play four more moves each. '
                    'Each move by Ọláberinjọ is a synthesis — '
                    'not a calculation. He is not thinking; '
                    'he is knowing.'),
        P('action', 'FINAL MOVE: Ọláberinjọ takes seeds from '
                    'the Ìká pit — House Eleven, where the weave '
                    'is the answer — and distributes them in '
                    'a spiral that touches every remaining pot '
                    'on the board. One seed each. The board '
                    'equalizes. No pit dominant, no pit empty. '
                    'Every domain acknowledged simultaneously.'),
        P('action', 'The central channel fills. Seven seeds, '
                    'accumulated over the game, visibly complete.'),
        P('action', 'The board is still.'),
        P('action', 'Oníkàámògún looks at it for a long moment. '
                    'He looks at Ọláberinjọ.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Ọ̀ta ló máa jẹ Oníìká.'),
        P('note',  '[SUBTITLE: It is the winner who will be crowned '
                   'as king of Ìká.]'),
        SP(),
        P('action', 'No crown ceremony. No title conferred. '
                    'No audience. The two pàràká stand absolutely still.'),
        P('action', 'The crowning is the understanding. '
                    'It happened during the game. '
                    'The words confirm what has already occurred.'),
        P('action', 'Ọláberinjọ does not feel victorious. '
                    'He feels — for the first time since leaving '
                    'the Institute — exactly the right size.'),
        SP(),
    ]

    # ── SEQUENCE 20: THE ẸNU AWO DECLARATION ──────────────────────────────────
    s += [
        P('scene', 'INT. THE 17TH COMPOUND, INNER CHAMBER — CONTINUOUS'),
        P('action', 'Oníkàámògún puts the board away — each pit '
                    'closed carefully, seeds counted back to starting '
                    'positions, the central channel cleared. '
                    'He does this with the same unhurried attention '
                    'he gives everything. Ọláberinjọ watches.'),
        P('action', 'When the board is stored, Oníkàámògún sits back. '
                    'He picks up the divination tray — not to cast, '
                    'but to look at the Ìká Méjì marks still there '
                    'from the earlier reading.'),
        P('action', 'He speaks to the marks. Not to Ọláberinjọ. '
                    'He is speaking to the Odu.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Ààke ní ń\'bagi sá.'),
        P('note',  '[SUBTITLE: It is the axe that hits a tree and runs back.]'),
        SP(),
        P('action', 'The second pàràká affirms it in the ancestral voice: '
                    'Ààke. The word lands like the thing itself.'),
        P('action', 'This is not metaphor. This is the Ẹnu Awo — '
                    'the diviner\'s mouth as instrument. '
                    'What is spoken here has the force of an axe. '
                    'What is named here moves.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ẹbọ gbà.'),
        P('note',  '[SUBTITLE: The sacrifice was received.]'),
        SP(),
        P('action', 'He does not name what the sacrifice was. '
                    'Ọláberinjọ knows.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ogun là á. Ẹni tó là ọ̀nà — '
                   'kì í jẹ olùrìn. Ó jẹ ọ̀nà. '
                   'Ẹsẹ̀ rẹ̀ ń dúró de àwọn tó ń bọ̀.'),
        P('note',  '[SUBTITLE: Ogun opened it. The one who clears a path — '
                   'is not a traveler. He is the path. '
                   'Your foot stands waiting for those who come.]'),
        SP(),
        P('action', 'The four blessings — not prayers. Pronouncements. '
                    'Ẹnu Awo. The diviner\'s mouth as command.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ajé wà. Ajé ń\'bọ̀. '
                   'Báwo bá ní a làjé, a sì máa lájé.'),
        P('note',  '[SUBTITLE: Wealth is here. Wealth is coming. '
                   'However we shall have wealth, we shall have it.]'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ìyàwó wà.'),
        P('note',  '[SUBTITLE: Partnership is here.]'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ọmọ wà.'),
        P('note',  '[SUBTITLE: Continuity is here.]'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ìrẹ gbogbo wà.'),
        P('note',  '[SUBTITLE: All good things are here.]'),
        SP(),
        P('action', 'Silence. The two pàràká are absolutely still. '
                    'The ancestral witnesses have heard.'),
        P('action', 'The Ẹnu Awo is complete. What was spoken will move.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── SEQUENCE 21: THE FUTURISTIC LAYER REVEAL ──────────────────────────────
    s += [
        P('scene', 'INT. THE 17TH COMPOUND / INT. INSTITUTE OF IFA STUDIES — '
                   'DAY (TRANSITION)'),
        P('action', 'The compound at the 17th house begins, very slowly, '
                    'to change. Not dramatically. The light quality shifts. '
                    'The texture of the walls — ancient stone — becomes '
                    'faintly translucent. Through the stone, another room. '
                    'The same room. The same configuration of objects. '
                    'But connected to something else now.'),
        P('action', 'The camera pulls back. The compound expands. '
                    'We are in the Institute of Ifa Studies.'),
        SP(),
        P('scene', 'INT. INSTITUTE OF IFA STUDIES, VARIOUS SPACES — '
                   'DAY (FUTURE)'),
        P('action', 'Not a dramatic reveal. A gradual recognition.'),
        P('action', 'A BABALAWO-ENGINEER at a workstation shaped like '
                    'an Ifa divination tray — circular, the 256 Odu '
                    'configurations as selectable parameters in a '
                    'computational model. She is working on a '
                    'structural problem for a building in Lagos. '
                    'The Ogunda principle — paths that work with '
                    'the land\'s biological memory — deployed '
                    'as the foundation calculation.'),
        P('action', 'A DRUM ENSEMBLE — Ìlú-Ìlù performers — '
                    'recording new Èdè Ìlú sequences in collaboration '
                    'with an INFORMATION SCIENTIST encoding a '
                    'communication protocol in drum language. '
                    'More efficient than binary — Yoruba drum language '
                    'operates in four-state notation, not two-state. '
                    'The rhythm is the protocol.'),
        P('action', 'WEAVERS at digital looms — programmed with '
                    'Odu matrices; the resulting àká cloth is both '
                    'a work of art and a functional diagnostic tool. '
                    'The geometric pattern encodes the patient\'s '
                    'Odu at time of production. The cloth is worn. '
                    'The cloth is the medical record.'),
        P('action', 'Ayò Ọlọ́pọ́nfá boards in every teaching space — '
                    'the game played not as recreation but as '
                    'training method. Every person who works here '
                    'has learned to read the whole board.'),
        P('action', 'Ọláberinjọ, older now, presenting to a much '
                    'larger gathering. The question he came with — '
                    '"How do we use the arts to study the sciences?" — '
                    'is now a demonstrated method, with working '
                    'applications, with a sixteen-house curriculum '
                    'that students have been walking for a generation.'),
        SP(),
        P('scene', 'EXT. MARKET — DAY (PRESENT / FUTURE — AMBIGUOUS)'),
        P('action', 'A market. A seller standing with something perfect. '
                    'A busy market. No buyers.'),
        P('action', 'Then: a buyer. Then another. Then the market '
                    'flows toward her as a matter of course.'),
        P('action', 'ALÁKÀRÀ — or her inheritor, her echo — '
                    'does not look surprised. She looks exactly like '
                    'someone who always knew the akara was right.'),
        SP(),
        P('trans', 'DISSOLVE TO:'),
    ]

    # ── SEQUENCE 22: THE CLOSING POEM ─────────────────────────────────────────
    s += [
        P('scene', 'EXT./INT. VARIOUS — THE CLOSING POEM'),
        P('action', 'The same voice. The same Yoruba. The same sixteen '
                    'lines. English subtitles appearing more slowly now — '
                    'the audience has been inside this language for '
                    'the full film; they are reading it differently.'),
        P('action', 'Each image has been earned.'),
        SP(),
        P('char', 'VOICE (V.O.)'),
        P('dial',  'Mo de Òde Ìká —'),
        P('note',  '[SUBTITLE: I arrive at the Frontier of Ìká —]'),
        SP(),
        P('action', 'Ọláberinjọ walking the road from Ofun toward '
                    'the convergence point. We are arriving — '
                    'and this time we know what we are arriving at.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Òde Ìkà — Òde Àká — Òde Ònkà —'),
        P('note',  '[SUBTITLE: The Frontier of Cruelty — '
                   'the Frontier of the Woven Thread — '
                   'the Frontier of Counting —]'),
        SP(),
        P('action', 'Three quick shots — we have been inside '
                    'all three. We know the weight of each name now.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Níbití orúkọ wọn rí kakaka —'),
        P('note',  '[SUBTITLE: Where their names are '
                   'many-layered and intricate —]'),
        SP(),
        P('action', 'All 32 characters of this world — '
                    'the ones we have met, the ones '
                    'we have heard of, the ones who '
                    'exist at the edges of the story. '
                    'Their names layered, complex, earned.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí ọba wọn ń\'gbé ní káà —'),
        P('note',  '[SUBTITLE: Where their king dwells '
                   'within the innermost chamber —]'),
        SP(),
        P('action', 'Oníkàámògún in his compound. '
                    'We see his face clearly now for the '
                    'first time since the film began. '
                    'Not hidden. Known.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí o ń\'dáfá pẹ̀lú orí ọká —'),
        P('note',  '[SUBTITLE: Who casts divination '
                   'with the head of the cobra snake —]'),
        SP(),
        P('action', 'The cobra\'s head tracing marks in powder. '
                    'Precise and ancient and alive.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí ìbakà talákáa léjìká —'),
        P('note',  '[SUBTITLE: Where the donkey struck '
                   'the man named Lákáa upon the shoulder —]'),
        SP(),
        P('action', 'The donkey and Lákáa. Still, quiet, '
                    'irreversible. The cobra at the tree root. '
                    'The image carries the full weight of the journey.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Àkàakà ìgbasà ló jẹ́ ará Òde Ìká —'),
        P('note',  '[SUBTITLE: The ones that spun the thread '
                   'continuously in the ìgbasà tree '
                   'are the people of Òde Ìká —]'),
        SP(),
        P('action', 'The thread-spinners at the àgbasà tree, '
                    'their hands never stopping. '
                    'Scientists and artists, the same hands.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Lọba ọba wọn, Oníkàámògún, ń\'tayò Oníkáà —'),
        P('note',  '[SUBTITLE: Their paramount king, Oníkàámògún, '
                   'plays the chambered-Ayo Game —]'),
        SP(),
        P('action', 'The Ayò Ọlọ́pọ́nfá board. Sixteen pots. '
                    'Seeds moving. The central channel '
                    'holding its seven seeds.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Ọ̀ta ló máa jẹ Oníìká —'),
        P('note',  '[SUBTITLE: It is the winner who will be '
                   'crowned as king of Ìká —]'),
        SP(),
        P('action', 'Ọláberinjọ. The winner. Not triumphant. '
                    'The right size.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí o mamaa jayé ọba ní káà —'),
        P('note',  '[SUBTITLE: Yet he is the one who will always '
                   'thrive and reign as king within the chamber —]'),
        SP(),
        P('action', 'Oníkàámògún thriving and reigning. '
                    'Not a king of territory. A king of mastery.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Òde Ìká níbití wọn tí n\'ṣe aṣọ àká —'),
        P('note',  '[SUBTITLE: Òde Ìká, where they have long '
                   'been weaving the àká cloth —]'),
        SP(),
        P('action', 'The weavers of House Eleven. '
                    'The Babalawo-engineers of the future. '
                    'The same hands, different time.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Tí èbìtì kakaka ń\'pa ìgbín kakaka —'),
        P('note',  '[SUBTITLE: Where the strong trap '
                   'kills the strong snail —]'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Nítorì èbìtì tí ò gbójú kòle pàgbín kakaka —'),
        P('note',  '[SUBTITLE: Because a trap that is not strong '
                   'cannot kill the strong snail —]'),
        SP(),
        P('action', 'Ọláberinjọ at the river in House Fifteen. '
                    'The whole journey, compressed to one image.'),
        SP(),
        P('char', 'VOICE (V.O.) (CONT\'D)'),
        P('dial',  'Nílú Òde Ìká tí wọn tí n\'ṣe aṣọ àká —'),
        P('note',  '[SUBTITLE: In the city of Òde Ìká, where they '
                   'have long been weaving the àká cloth.]'),
        SP(),
        P('action', 'FINAL IMAGE: A weaver — not one specific weaver '
                    'from one specific house, or all of them at once. '
                    'Her hands moving. The àká cloth emerging from '
                    'the loom. The pattern building. The camera holds '
                    'on the cloth as it grows, the Odu marks of '
                    'Ìká Méjì forming in the weave — the doubled mark, '
                    'the system seeing itself. The pattern glows, '
                    'faintly, with the light of the 17th house.'),
        P('action', 'The loom continues. The pattern will continue '
                    'beyond the frame.'),
        SP(),
        P('trans', 'FADE TO BLACK.'),
        SP(0.3),
        P('center', '— END OF ACT THREE —'),
        SP(0.2),
        PageBreak(),
    ]

    # ═══════════════════════════════════════════════════════════════════════════
    #  ACT FOUR — ÌPADÀBỌ̀ (THE RETURN)
    # ═══════════════════════════════════════════════════════════════════════════
    s += [
        P('act', 'ACT FOUR — ÌPADÀBỌ̀\n(THE RETURN)'),
        SP(0.2),
        P('center', 'Concluding Part One / Series One'),
        SP(0.1),
        P('center', '[ ÒDÈÌKÁ — Part One of Sixteen ]'),
        SP(0.3),
    ]

    # ── SEQUENCE 1: THE MORNING OF MASTERY ─────────────────────────────────────
    s += [
        P('scene', 'EXT. ÒDÈÌKÁ — CITY WALLS — DAWN'),
        P('action', 'A different dawn from the one that opened this story. '
                    'The same walls. The same stone. The same àká cloth patterns '
                    'pressed into the masonry. But the light falls differently now — '
                    'not the dramatic spill of Act One, not the searching arc of '
                    'the journey, but a steady, earned illumination. '
                    'Warm. Patient. Not yet full.'),
        SP(),
        P('action', 'A muezzin of sorts — but it is not a voice calling. '
                    'It is the sound of looms beginning. One. Two. A dozen. '
                    'The city\'s morning prayer is the sound of work resuming.'),
        SP(),
        P('action', 'We move through the city in a single, unbroken drift-shot — '
                    'a gentle, unhurried camera that has earned the right to wander. '
                    'The 16 Houses, glimpsed as we pass.'),
        SP(),
        P('action', 'HOUSE ONE (OGBE): The solar observatory dome is open. '
                    'Two apprentices check the morning readings. One writes in chalk '
                    'on a slate the color of midnight. The other sketches in àká thread '
                    'the exact pattern. Science and art. Same hand.'),
        SP(),
        P('action', 'HOUSE THREE (IWORI): Ìyá Akáọgbọ̀n moves slowly through her '
                    'corridor of mirrors. She pauses at one. Looks. Nods — not at '
                    'her own reflection, but at something she sees behind it. '
                    'She is satisfied.'),
        SP(),
        P('action', 'HOUSE SIX (OWONRIN): Ìlú-Ìlù is already alive — the drum city '
                    'never truly sleeps. But the morning rhythm is different from the '
                    'night rhythm. Slower. A conversation, not a proclamation.'),
        SP(),
        P('action', 'HOUSE ELEVEN (ÌKÁ): The Ifa Art compound — the weavers are '
                    'already at the àká cloth. The pattern from last night has been '
                    'slept on and resumed. The Ayò Ọlọ́pọ́nfá board sits at the center '
                    'of the compound, its sixteen pots clean, seeds rearranged to '
                    'starting position. Ready for the next game.'),
        SP(),
        P('action', 'HOUSE FIFTEEN (OSE): Ọláberinjọ\'s river, seen in first '
                    'proper daylight. The water holds the light differently. '
                    'The àkàlàmàgbò bird — silent now. Its work last night was '
                    'significant. It rests.'),
        SP(),
        P('action', 'HOUSE SIXTEEN (OFUN): The threshold gate stands open. '
                    'No one guarding it. No one needed.'),
        SP(),
        P('action', 'We arrive finally at the center: the compound where the '
                    'Ayo game was played. The board is still there. The seeds '
                    'remain in the position they reached at game\'s end — the '
                    'spiral distribution from the Ìká pit, the central channel '
                    'full. No one has moved them.'),
        SP(),
        P('action', 'Oníkàámògún sits nearby. Still in his àká cloth. '
                    'He has not slept. He is not tired. He is computing something — '
                    'not on paper, not on a tray. In his chest.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── SEQUENCE 2: THE FIRST DECREE ───────────────────────────────────────────
    s += [
        P('scene', 'INT. GREAT HALL OF ÒDÈÌKÁ — MORNING'),
        P('action', 'The hall fills. Every character we have met across the '
                    'sixteen houses — the scholars, the drum-speakers, the '
                    'weavers, the sculptors, the astronomers, the botanists, '
                    'the children who asked good questions in House Nine, '
                    'the old woman who recognized the map in House Five. '
                    'They come not because they were summoned, but because '
                    'they felt the shift in the air and followed it.'),
        SP(),
        P('action', 'Ọláberinjọ stands to one side, still in the traveling clothes '
                    'she arrived in. She is the only one who does not belong by '
                    'history. She belongs by journey.'),
        SP(),
        P('action', 'Oníkàámògún stands — not at the throne at the chamber\'s '
                    'center, but at the edge of the hall, near the door that opens '
                    'to the outside. He faces both the room and the frontier.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('paren', '(in Yoruba, carrying)'),
        P('dial',  'Mo fẹ́ sọ ọ̀kan ṣoṣo nǹkan.'),
        P('note',  '[SUBTITLE: I wish to say one single thing.]'),
        SP(),
        P('action', 'The room stills. Even the children.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ìjà tí ó ń\'pa wa ní òde — kì í ṣe ìjà ogun. '
                   'Kì í ṣe ìjà owó. Kì í ṣe ìjà ilẹ̀. '
                   'Ìjà yi ni: a máa ń kọ ẹ̀kọ́ ní èdè elédè, '
                   'pẹ̀lú àṣà aláṣà. A jẹ ọlọ̀gbẹ́rì tí ò nímọ̀ tó péye ní èdè àbínibí rẹ, ' 
                   'tí wá ń\'jẹ egungun bi alákàrà Òde Ìká.'),
        P('note',  '[SUBTITLE: The war that is killing us outside — '
                   'it is not a war of armies. Not a war of money. '
                   'Not a war of land. The war is this: we learn in a foreign language and using a foreign culture '
                   'We have become ọlọ̀gbẹ́rì, who does not have solid knowledge in their mother tongue and thus suffers in the misdt of plenty like the akara seller in Ode Ika]'),
        SP(),
        P('action', 'A long silence. The scholars recognize this word — '
                    'ọ̀gbẹ́rì — in their own work. In their own lives. '
                    'The drummaster looks at his youngest apprentice. '
                    'The apprentice looks at the floor. Knows.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ìdáhùn kì í ṣe ìwé. Kì í ṣe òfin. '
                   'Ìdáhùn ni ilé-ẹ̀kọ́ àti ìmọ̀ tí ó wá láti inú Ifá, ìmọ̀ tí a rán pọ̀, '
                   'ìmọ̀ tí ó bá ìmọ̀ pàdé. Àwọn ìmọ̀ tí ó bárawọn sọ̀rọ̀ ní Èdè Ọ̀pẹ̀ (Èdè Ifá).'),
        P('note',  '[SUBTITLE: The answer is not a text. Not a law. '
                   'The answer is a school and knowledge that comes from Ifa, knowledge that is woven together. '
                   'A school where knowledge does not travel to another place alone — '
                   'knowledge that meets knowledge. '
                   'Knowledge that talks to one another in Ọ̀pẹ̀ Language, the very ancient Language of Ifa (IfaLang).]'),
        SP(),
        P('action', 'He turns to the hall. Gestures broadly — not at the walls '
                    'but at the people. At what they each carry.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('dial',  'Ilé mẹ́rìndínlógún. Ẹ̀kọ́ mẹ́rìndínlógún. '
                   'Kò sí ọ̀kan tí ó ga ju ìkejì. Kò sí ọ̀kan tí ó kéré ju ìkejì. '
                   'Gbogbo wọn jẹ́ ọba ara laye ara wọn. Gbogbo wọn jẹ́ akẹ́kọ́ funra wọn. '
                   'Bẹ́ẹ̀ ni Ìká Méjì ṣe ń\'sọ.'),
        P('note',  '[SUBTITLE: Sixteen houses. Sixteen disciplines. '
                   'Not one greater than another. Not one lesser than another. '
                   'Each is king to itself. Each is student to itself. '
                   'So says Ìká Méjì.]'),
        SP(),
        P('action', 'ÌYÁLÓDE ṢÀNGỌ̀ẸKÒ, the market queen from the Alákàrà quarter, '
                    'steps forward. She is not a scholar. She is the woman who '
                    'trades in the market that everyone passes through without '
                    'stopping. She is the embodiment of the Ọ̀gbẹ̀rì (the \'uninformed\') problem.'),
        SP(),
        P('char', 'ÌYÁLÓDE ṢÀNGỌ̀ẸKÒ'),
        P('paren', '(direct, market voice)'),
        P('dial',  'Ọba, àwa olójà — ṣé ẹ ní kí a mọ ìmọ̀ àwọn ọ̀mọ̀wé?'),
        P('note',  '[SUBTITLE: King, we market-people — should we learn scholars\' knowledge?]'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'Rárá. Àwọn ọ̀mọ̀wé ni a fẹ́ kí wọn mọ ìmọ̀ olójà.'),
        P('note',  '[SUBTITLE: No. We want the scholars to learn the knowledge '
                   'of the market-people.]'),
        SP(),
        P('action', 'A beat of surprise. Then — across the hall — something releases. '
                    'Laughter that is also relief. The market queen stands taller. '
                    'The scholars look at each other: we have work to do.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('paren', '(quietly, to the whole room)'),
        P('dial',  'Ká bẹ̀rẹ̀.'),
        P('note',  '[SUBTITLE: Let us begin.]'),
        SP(),
        P('trans', 'CUT TO:'),
    ]


    # ── SEQUENCE 4: THE QUESTION OF DEPARTURE ──────────────────────────────────
    s += [
        P('scene', 'INT. HOUSE ELEVEN — ÌKÁ COMPOUND — LATE MORNING'),
        P('action', 'Ọláberinjọ and Oníkàámògún, alone in the Ifa Art compound. '
                    'The àká cloth, the Ayo board, the art-science instruments '
                    'all around them. She is packing nothing — she arrived with '
                    'almost nothing. But she is clearly preparing to leave.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(in Yoruba, carefully)'),
        P('dial',  'Mo gbọdọ̀ padà.'),
        P('note',  '[SUBTITLE: I must return.]'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'Padà sí ibo?'),
        P('note',  '[SUBTITLE: Return to where?]'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('dial',  'Sí ibití mo bẹ̀rẹ̀. Ilé-ẹ̀kọ́ náà. Àwọn ọmọ ẹgbẹ́ mi. '
                   'Àwọn ọmọ tí ọ̀nà ẹ̀kọ́ wọn kò dánmọrán tó. '
                   'Mo mọ̀ ohun tí mo ní lati ṣe bá yìí.'),
        P('note',  '[SUBTITLE: To where I started. That institute. My colleagues. '
                   'The students whose path of learning is not yet resolved. '
                   'I know now what I have to do now.]'),
        SP(),
        P('action', 'Oníkàámògún studies her. He is not testing her answer. '
                    'He already knew what she would say. He is measuring '
                    'whether she knows why she is saying it.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'Kí ni ìmọ̀ tí o mú padà?'),
        P('note',  '[SUBTITLE: What knowledge do you carry back?]'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(a long pause — she is assembling something true)'),
        P('dial',  'Pé ohun tí a ń pè ní ìmọ̀  ìjìnlẹ̀ àti ohun tí a ń pè ní ẹ̀kọ́ iṣẹ́ ọnà '
                   'kò yàtọ̀ rárá. Pé olùkọ̀ tí ó pín wọn sọtọ̀ '
                   'ní láti ṣe àtúnṣe.'
                   'Pé ọmọ tí ń kọjá kọjá — kótodé — kì í ṣe alákànú. '
                   'Kò sí ibi tí ó tó pé kí a gbé dúró níbẹ̀.'),
        P('note',  '[SUBTITLE: That what we call knowledge and what we call art '
                   'were never separate. That a teacher who splits them apart '
                   'needs correct this siloed approach.]'),
        SP(),
        P('action', 'Oníkàámògún reaches beside the Ayo board. He lifts something '
                    'small: a single ayò seed — one of the game seeds. He holds it '
                    'out to Ọláberinjọ. She takes it.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN'),
        P('dial',  'Irúgbìn kan. Bẹ̀rẹ̀ pẹ̀lú rẹ̀. Ẹni tí yóò mọ ohun '
                   'tí ó wa ní nínú ohun kékeré yìí — yóò mọ ohun mẹ́rìndínlógún.'),
        P('note',  '[SUBTITLE: One seed. Begin with it. The person who truly '
                   'understands what is inside this small thing — '
                   'will understand sixteen things.]'),
        SP(),
        P('action', 'She closes her fingers around it. Nods. A student '
                    'who has finally found the right school.'),
        SP(),
        P('char', 'ONÍKÀÁMÒGÚN (CONT\'D)'),
        P('paren', '(a half-smile)'),
        P('dial',  'Ẹnu Awo.'),
        P('note',  '[SUBTITLE: The mouth of the mystery.]'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(completing it, quietly)'),
        P('dial',  'Àáke ní ń\'bagi sá.'),
        P('note',  '[SUBTITLE: It is the axe that hits a tree and runs back.]'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── SEQUENCE 5: THE THRESHOLD CROSSED ──────────────────────────────────────
    s += [
        P('scene', 'EXT. GREAT GATE OF ÒDÈÌKÁ — MIDDAY'),
        P('action', 'The city\'s great gate. The threshold. The place where '
                    'the frontier begins — or ends, depending on which direction '
                    'you are traveling.'),
        SP(),
        P('action', 'Ọláberinjọ walks toward it alone. '
                    'Behind her — not following, but present — figures from '
                    'each of the sixteen houses. They do not form a procession. '
                    'They have simply all happened to be near the gate at this hour. '
                    'The way a city is always watching its travelers.'),
        SP(),
        P('action', 'She pauses at the threshold. Turns once. Looks back at '
                    'what she is leaving. She cannot see all sixteen houses from here. '
                    'She does not need to. She carries the map.'),
        SP(),
        P('action', 'The drummaster of House Six raises one hand. '
                    'A single note — the dùndún calls a name in Yoruba drum language. '
                    'Not her name. Her title. The title the city is giving her '
                    'as she departs. There is no English subtitle for drum language. '
                    'The audience hears it directly.'),
        SP(),
        P('action', 'She turns and walks through the gate.'),
        SP(),
        P('action', 'SLOW MOTION: the moment she crosses the threshold. '
                    'Her feet on the stone of the city; then her feet '
                    'on the earth of the frontier. The precise line. '
                    'This is the same gesture as the opening of the film — '
                    'reversed. Then, she was arriving. Now she is departing.'),
        SP(),
        P('action', 'The gate does not close behind her.'),
        SP(),
        P('action', 'It stays open.'),
        SP(),
        P('action', 'It will stay open.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── SEQUENCE 6: THE INSTITUTE — RETURN ─────────────────────────────────────
    s += [
        P('scene', 'INT. INSTITUTE OF IFA STUDIES — LECTURE HALL — DAY'),
        P('action', 'Hard cut. Modern. Fluorescent. '
                    'The hum of air conditioning. Plastic chairs. '
                    'A projector screen showing a PowerPoint slide. '
                    'The present day.'),
        SP(),
        P('action', 'The Institute of Ifa Studies — the frame device of Act One '
                    'has been waiting here. The same space Ọláberinjọ stood in '
                    'at the very beginning, presenting her early tentative research '
                    'to skeptical colleagues.'),
        SP(),
        P('action', 'But the hall is different now. Filled. '
                    'Not with skeptical colleagues but with students — young, '
                    'impatient, carrying the particular restlessness of people '
                    'who have been taught that learning is supposed to hurt. '
                    'They are Ọlọ̀gbẹ́rì by design, by a system that has taught '
                    'them to cram formulas and principles instead of seeking to understand as an interconnected system.'),
        SP(),
        P('action', 'Ọláberinjọ stands at the front. '
                    'She looks exactly as she did when she left '
                    '— same clothes, same traveling worn quality — '
                    'but her posture is different. She has been somewhere.'),
        SP(),
        P('action', 'She looks at the PowerPoint slide. '
                    'It shows the title of her talk: '
                    '"Arts and Sciences in Odu Ifa: A Comparative Framework." '
                    'A good academic title. Correct. Sufficient. Bloodless.'),
        SP(),
        P('action', 'She clicks the slide off. The screen goes white.'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(in Yoruba, then English — her first and last code-switch)'),
        P('dial',  'Ẹ jẹ́ kí a bẹ̀rẹ̀ pẹ̀lú eré kan.'),
        P('note',  '[SUBTITLE: Let us begin with a game.]'),
        SP(),
        P('action', 'She opens her laptop. On the projected screen: '
                    'the Ayò Ọlọ́pọ́nfá interface loads. '
                    'The sixteen-pot board. The seeds. The central channel. '
                    'A few students lean forward. Some exchange looks. '
                    'This is not what they expected.'),
        SP(),
        P('char', 'STUDENT — FRONT ROW'),
        P('paren', '(skeptical, in English)'),
        P('dial',  'Is this... a game?'),
        SP(),
        P('char', 'ỌLÁBERINJỌ'),
        P('paren', '(in Yoruba)'),
        P('dial',  'Àwòrán àgbáyé. Kì í ṣe eré lásán, '
                   'ẹ̀rọfá ayárabíaṣá ni. Ẹ jẹ́ n ṣàlàyé.'),
        P('note',  '[SUBTITLE: A world-model. Not merely a game. '
                   'The Ifa Computer. Let me explain.]'),
        SP(),
        P('action', 'She begins. And for the first time in the film, '
                    'we sense that a teacher is teaching from inside the knowledge — '
                    'not above it, not outside it, not passing through it — '
                    'but dwelling there.'),
        SP(),
        P('action', 'MONTAGE — THE SEMESTER:'),
        SP(),
        P('action', 'The Ayò Ọlọ́pọ́nfá board as physics lesson — seeds as particles, '
                    'pots as orbital positions. Students arguing over the central channel.'),
        SP(),
        P('action', 'The Ìlú-Ìlù drum platform open on the screen — '
                    'students listening to the Èdè Ìlú (drum language) as a '
                    'data-compression lecture. The student from the front row '
                    'is suddenly intensely interested.'),
        SP(),
        P('action', 'The Ifa Art platform — a student\'s face close to the screen, '
                    'tracing an Odu mark. Then, off-screen, the sound of her '
                    'sketching the same mark into a geometry notebook.'),
        SP(),
        P('action', 'A student in the hall who has never moved before — '
                    'stands up to demonstrate something at the board. '
                    'He is not passing through anymore. He is stopping.'),
        SP(),
        P('action', 'End montage. Late afternoon. The hall is clearing.'),
        SP(),
        P('action', 'Ọláberinjọ is alone, packing up. '
                    'She opens her palm. The ayo seed from Oníkàámògún. '
                    'Still there. She places it on the table beside the laptop. '
                    'A small, exact gesture.'),
        SP(),
        P('trans', 'CUT TO:'),
    ]

    # ── SEQUENCE 7: THE SEED OF SERIES 2 ───────────────────────────────────────
    s += [
        P('scene', 'INT. INSTITUTE OF IFA STUDIES — ỌLÁBERINJỌ\'S OFFICE — NIGHT'),
        P('action', 'Her office. Night. The city outside is indistinct — lights, '
                    'traffic, the hum of a world that has not yet heard what she learned. '
                    'Or has heard it, and is still figuring out how to listen.'),
        SP(),
        P('action', 'She is at her desk. Ifa texts around her — physical volumes, '
                    'worn at the spines, many of them her own annotations. '
                    'She has been in this room before. She has read these books before. '
                    'They are different books now. Same pages. Different eyes.'),
        SP(),
        P('action', 'She opens her laptop. The Ayò Ọlọ́pọ́nfá board is still running '
                    'from the day\'s session — paused mid-game, a student\'s unfinished move. '
                    'She looks at it. Sixteen pots. Sees the whole board.'),
        SP(),
        P('action', 'She begins to write her research notes. We see the screen '
                    'over her shoulder — the working title: '
                    '"Ìká Méjì as Generative Matrix: Toward an Integrative '
                    'Epistemology of Ifa Science-Arts."'),
        SP(),
        P('action', 'She types. Pauses. Reaches for the volume of Odu texts '
                    'on her right side. She is not looking for Ìká Méjì anymore. '
                    'She knows it now. She opens the book to a different section. '
                    'Her fingers find the place as if by memory, though she has '
                    'not read this passage since before her journey.'),
        SP(),
        P('action', 'She reads. Something changes in her face. Not alarm. '
                    'Recognition. The feeling of hearing a name you thought '
                    'you had imagined.'),
        SP(),
        P('action', 'She opens a fresh document. Types a title. '
                    'We see it on the screen:'),
        SP(),
        P('center', '[ OGBE MÉJÌ — THE FIRST LIGHT ]'),
        SP(),
        P('action', 'Below it, she types the opening verse — in Yoruba. '
                    'The first line of the corpus of the first Odu. '
                    'The Odu that is the origin of light itself. '
                    'She does not know yet where this will take her. '
                    'She knows that she has to go.'),
        SP(),
        P('action', 'She pauses. Looks up from the screen. '
                    'Out the window. The city at night. '
                    'In the far distance — barely visible through the smog '
                    'and the towers of glass and concrete — something. '
                    'Not walls. Not stone. But a quality of permanence '
                    'that belongs to something that has been standing '
                    'for a very long time.'),
        SP(),
        P('action', 'She turns back to the screen. Keeps writing.'),
        SP(),
        P('action', 'The ayo seed sits on the desk beside the laptop. '
                    'The camera drifts toward it — slow, deliberate, '
                    'earning the close-up. The seed in full frame. '
                    'Unremarkable. Brown. Exactly the size of the knowledge '
                    'contained inside it.'),
        SP(),
        P('action', 'Then — in the seed, we see it. Not magic. Not CGI spectacle. '
                    'Something simpler: the faint marks of Ìká Méjì etched '
                    'naturally into the surface of the seed itself. '
                    'The Odu\'s own marks. The pattern was always there.'),
        SP(),
        P('action', 'HOLD on the seed.'),
        SP(),
        P('trans', 'FADE TO BLACK.'),
        SP(0.3),
    ]

    # ── CODA: END OF PART ONE / SERIES 1 ───────────────────────────────────────
    s += [
        PageBreak(),
        SP(1.5),
        P('center', '═' * 40),
        SP(0.3),
        P('act', 'END OF PART ONE'),
        SP(0.2),
        P('subtitle', 'SERIES ONE — ÌKÁ MÉJÌ COMPLETE'),
        SP(0.5),
        P('center', '[ SIXTEEN SERIES TOTAL ]'),
        SP(0.5),
        P('center', '— — —'),
        SP(0.5),
        P('subtitle', 'Series 1: Ìká Méjì — Òdè-Ìká'),
        SP(0.1),
        P('small',   'The mastery at the frontier. The polymathic king. '
                     'The Ọ̀gbẹ̀rì named and answered. Series complete.'),
        SP(0.4),
        P('subtitle', 'Series 2: Ogbe Méjì — coming'),
        SP(0.1),
        P('small',   'The first light. The Odu of origin. '
                     'A different question. A different frontier.'),
        SP(0.4),
        P('center', '— — —'),
        SP(0.5),
        P('center', 'ÒDÈ-ÌKÁ'),
        SP(0.1),
        P('center', 'Written by CENProject and Babalawo Ajetumobi Esubiyi Obakolawole'),
        SP(0.1),
        P('center', 'Based on Odu Ifa Ìká Méjì'),
        SP(0.3),
        P('center', 'Ìká Méjì has spoken.'),
        SP(0.3),
        P('center', '═' * 40),
        SP(0.3),
        P('small',  'ifainternet.org  |  playifagames.org'),
    ]

    return s

# ── Build & save PDF ──────────────────────────────────────────────────────────
OUTPUT = '/home/cenproject/ifa-internet/OdeIka_Screenplay.pdf'

doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=letter,
    leftMargin=LM,
    rightMargin=RM,
    topMargin=TM,
    bottomMargin=BM,
    title='ÒDÈÌKÁ — Screenplay',
    author='CENProject',
    subject='Based on Odu Ifa Ìká Méjì',
)

story = build_story()
doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
print(f'PDF saved → {OUTPUT}')
